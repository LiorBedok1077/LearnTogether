import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { SignupDto } from '../src/modules/auth/dto';
import { GenderEnum, PreferedLanguagesEnum, PreferedLanguagesEnumType } from '../interfaces';

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
    const dto: SignupDto = {
      full_name: 'Lior Bedok',
      gender: GenderEnum.MALE as keyof typeof GenderEnum,
      email: "liorbedok1077@gmail.com",
      password: "123456789",
      username: "ShadowCyanil1077",
      bio: "I like 1, 2, 3 and 4",
      interests: ["123", "123", "123", "123", "123", "123", "123", "123", "123",],
      prefered_langs: [
        PreferedLanguagesEnum.ENGLISH as PreferedLanguagesEnumType,
        PreferedLanguagesEnum.HEBREW as PreferedLanguagesEnumType
      ]
    }
    describe('sign-up', () => {
      // error: email is empty
      it('should throw error - filelds are missing', () => pactum
        .spec()
        .post("http://localhost:5000/v1/auth/signup")
        // .post("/auth/signup")
        .withBody({
          password: dto.password
        })
        .expectStatus(400)
        .inspect())
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
        .withBody(dto)
        .expectStatus(201))
    })
    // describe('sign-in', () => {
    //   // error: email is empty
    //   it('should throw error - email is empty', () => pactum
    //     .spec()
    //     .post("/auth/signin")
    //     .withBody({
    //       password: dto.password
    //     })
    //     .expectStatus(400))
    //   // error: no dto
    //   it('should throw error - no dto', () => pactum
    //     .spec()
    //     .post("/auth/signin")
    //     .withBody({})
    //     .expectStatus(400))
    //   // should login
    //   it('should login', () => pactum
    //     .spec()
    //     .post("/auth/login")
    //     .withBody(dto)
    //     .expectStatus(201)
    //     .stores('userAt', 'access_token'))
    // })
  })
});
