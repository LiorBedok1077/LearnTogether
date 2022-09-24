import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
// types
import { SigninDto, SignupDto } from '../src/modules/auth/dto';
import { PreferedLanguagesEnum, GenderEnum } from '../src/interfaces/db-models';
import { ChangePasswordDto, UpdateUserDto } from '../src/modules/user/dto';

const TEST_PORT = 5001

describe('AppController (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))
    app.enableVersioning({
      type: VersioningType.URI
    })
    await app.init()
    await app.listen(TEST_PORT)

    prisma = app.get(PrismaService)
    await prisma.cleanDB()
    pactum.request.setBaseUrl(`http://localhost:${TEST_PORT}/v1`)
  })

  afterAll(() => {
    app.close()
  })
  describe('Auth', () => {
    // Auth testing
    describe('sign-up', () => {
      const SignupDto: SignupDto = {
        full_name: 'Lior Bedok',
        gender: GenderEnum.MALE,
        email: "unrelated_user@gmail.com",
        password: "123456789",
        username: "unrelated_user",
        bio: "I like 1, 2, 3 and 4",
        interests: ["Psychology", "Astronomy", "Philosophy"],
        prefered_langs: [
          PreferedLanguagesEnum.ENGLISH,
          PreferedLanguagesEnum.HEBREW
        ]
      }
      // error: password is empty
      it('should throw error - password is missing', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody({
          password: SignupDto.password
        })
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
      // error: no dto
      it('should throw error - no dto', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody({})
        .expectStatus(HttpStatus.BAD_REQUEST))
      // // should sign up
      it('should sign-up', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody(SignupDto)
        .expectStatus(HttpStatus.CREATED)
      )
      it('should not sign-up - credentials are taken', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody(SignupDto)
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
    })
    describe('sign-in', () => {
      const SigninDto: SigninDto = {
        password: "123456789",
        username: "unrelated_user",
        remember_me: false
      }
      // error: email is empty
      it('should throw error - username is empty', () => pactum
        .spec()
        .post("/auth/signin")
        .withBody({ password: SigninDto.password })
        .expectStatus(400)
      )
      // error: username is empty
      it('should throw error - password is empty', () => pactum
        .spec()
        .post("/auth/signin")
        .withBody({ username: SigninDto.username })
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
      // should login
      it('should login', () => pactum
        .spec()
        .post("/auth/signin")
        .withBody({ ...SigninDto })
        .expectStatus(HttpStatus.OK)
        .stores('userAt', 'token')
      )
    })
  })
  describe('User', () => {
    // User testing
    describe('get-user-data', () => {
      // error: no authorization header (unauthorized)
      it('should throw error - no auth header', () => pactum
        .spec()
        .get("/user")
        .expectStatus(HttpStatus.UNAUTHORIZED))
      // error: invalid authorization header (unauthorized)
      it('should throw error - invalid auth header', () => pactum
        .spec()
        .get("/user")
        .withHeaders({
          'Authorization': "Bearer Nopee"
        })
        .expectStatus(HttpStatus.UNAUTHORIZED))
      // success: should get user data
      it('should get user data', () => pactum
        .spec()
        .get("/user")
        .withHeaders({
          'Authorization': "Bearer $S{userAt}"
        })
        .expectStatus(HttpStatus.OK)
        .stores('userId', 'user_id'))
      // error: user does not exist
      it('should throw error - user does not exist', () => pactum
        .spec()
        .get("/user/non-existing-user-id")
        .expectStatus(HttpStatus.NOT_FOUND))
      // success: should get (another) user data
      it('should get (another) user data', () => pactum
        .spec()
        .get("/user/$S{userId}")
        .expectStatus(HttpStatus.OK)
      )
    })
    describe('update-user', () => {
      const UpdateUserDto: UpdateUserDto = {
        full_name: "Dennis Lloyd",
        bio: "I'm a cool music artist"
      }
      // error: unauthorized
      it('should throw error - unauthorized', () => pactum
        .spec()
        .patch("/user")
        .expectStatus(HttpStatus.UNAUTHORIZED)
      )
      // error: no body
      it('should throw error - body not provided', () => pactum
        .spec()
        .patch("/user")
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody({})
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
      // success: user has been updated
      it('should update user', () => pactum
        .spec()
        .patch("/user")
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody(UpdateUserDto)
        .expectStatus(HttpStatus.OK)
      )
    })
    describe('change-password', () => {
      const ChangePasswordDto: ChangePasswordDto = {
        old_password: "123456789",
        new_password: "new_password_123"
      }
      // error: unauthorized (invalid auth header)
      it('should throw error - unauthorized (no auth header)', () => pactum
        .spec()
        .post('/user/change-password')
        .expectStatus(HttpStatus.UNAUTHORIZED))
      // error: old-password is incorrect
      it('should throw error - old-password is incorrect', () => pactum
        .spec()
        .post('/user/change-password')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody({ ...ChangePasswordDto, old_password: 'wrong-old-password' })
        .expectStatus(HttpStatus.FORBIDDEN))
      // success: changed password
      it('should change password', () => pactum
        .spec()
        .post('/user/change-password')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody(ChangePasswordDto)
        .expectStatus(HttpStatus.OK))
    });
    describe('delete-user', () => {
      // error: no authorization header (unauthorized)
      it('should throw error - invalid auth header', () => pactum
        .spec()
        .delete("/user/$S{userId}")
        .expectStatus(HttpStatus.UNAUTHORIZED))
      // success: should delete a user
      it('should delete a user', () => pactum
        .spec()
        .delete("/user/$S{userId}")
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .expectStatus(HttpStatus.NO_CONTENT))
    })
  })
});
