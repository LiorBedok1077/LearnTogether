import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { SigninDto, SignupDto } from '../src/modules/auth/dto';
import { PreferedLanguagesEnum, GenderEnum } from '../interfaces/db-models';

const TEST_PORT = 5001

describe('AppController (e2e)', () => {
  // let app: INestApplication;

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
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
    const SignupDto: SignupDto = {
      full_name: 'Lior Bedok',
      gender: GenderEnum.MALE,
      email: "liorbedok1077@gmail.com",
      password: "123456789",
      username: "ShadowCyanil1077",
      bio: "I like 1, 2, 3 and 4",
      interests: ["Psychology", "Astronomy", "Philosophy"],
      prefered_langs: [
        PreferedLanguagesEnum.ENGLISH,
        PreferedLanguagesEnum.HEBREW
      ]
    }
    const SigninDto: SigninDto = {
      password: "123456789",
      username: "ShadowCyanil1077",
      remember_me: false
    }
    describe('sign-up', () => {
      // error: email is empty
      it('should throw error - fields are missing', () => pactum
        .spec()
        .post("http://localhost:5000/v1/auth/signup")
        // .post("/auth/signup")
        .withBody({
          password: SignupDto.password
        })
        .expectStatus(400))
      // error: no dto
      it('should throw error - no dto', () => pactum
        .spec()
        .post("http://localhost:5000/v1/auth/signup")
        .withBody({})
        .expectStatus(400))
      // // should sign up
      it('should sign-up', () => pactum
        .spec()
        .post("http://localhost:5000/v1/auth/signup")
        .withBody(SignupDto)
        .expectStatus(201)
        .inspect())
    })
    describe('sign-in', () => {
      // error: email is empty
      it('should throw error - username is empty', () => pactum
        .spec()
        .post("http://localhost:5000/v1/auth/signin")
        .withBody({ password: SigninDto.password })
        .expectStatus(400)
        .inspect())
      // error: username is empty
      it('should throw error - password is empty', () => pactum
        .spec()
        .post("http://localhost:5000/v1/auth/signin")
        .withBody({ username: SigninDto.username })
        .expectStatus(400)
        .inspect())
      // should login
      it('should login', () => pactum
        .spec()
        .post("http://localhost:5000/v1/auth/signin")
        .withBody({ ...SigninDto })
        .expectStatus(201)
        .inspect())
      // .stores('userAt', 'access_token'))
    })
  })
});
