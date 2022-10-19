import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
// types
import { ChangeForgottenPasswordDto, ForgotPasswordDto, SigninDto, SignupDto } from '../src/modules/auth/dto';
import { PreferedLanguagesEnum, GenderEnum } from '@prisma/client';
import { ChangePasswordDto, UpdateUserDto } from '../src/modules/user/dto';
import { CreateGroupDto, UpdateGroupDto, UpdateParticipantsDto } from '../src/modules/group/dto';
import { listActionsEnum } from '../src/interfaces/dto';
import { CommentDto, CreateArticleDto } from '../src/modules/article/dto';

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
        full_name: 'Newton',
        gender: GenderEnum.MALE,
        email: "swuicnkds01@gmail.com",
        password: "123456789",
        username: "Artemixx",
        bio: "I like 1, 2, 3 and 4",
        interests: ["Psychology", "Astronomy", "Philosophy"],
        prefered_langs: [
          PreferedLanguagesEnum.ENGLISH,
          PreferedLanguagesEnum.HEBREW
        ]
      }
      // should sign up
      it('should sign-up', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody(SignupDto)
        .expectStatus(HttpStatus.CREATED))
    })
    describe('sign-in', () => {
      const SigninDto: SigninDto = {
        password: "123456789",
        username: "Artemixx",
        remember_me: false
      }
      // should login
      it('should login', () => pactum
        .spec()
        .post("/auth/signin")
        .withBody({ ...SigninDto })
        .expectStatus(HttpStatus.OK)
        .stores('userAt', 'token'))
    })
    describe('User', () => {
      // User testing
      describe('get-user-data', () => {
        const getUserMeth = () => pactum
          .spec()
          .get("/user")
          .withHeaders({
            'Authorization': "Bearer $S{userAt}"
          })
          .expectStatus(HttpStatus.OK)
          .stores('userId', 'user_id')
        for (let i = 1; i < 6; i++) {
          // get user data (i)
          it(`should get-user-data (${i})`, getUserMeth)
        }
      })
    })
  })
})