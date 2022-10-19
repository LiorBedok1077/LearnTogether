import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
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
      const SignupDto2: SignupDto = {
        ...SignupDto,
        username: 'Jake',
        email: "natanelmich103@gmail.com"
      }
      const SignupDto3: SignupDto = {
        ...SignupDto,
        username: '3rd',
        email: "natanelmich2005@gmail.com"
      }
      // error: password is empty
      it('error: password is missing', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody({
          password: SignupDto.password
        })
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
      // error: no dto
      it('error: no dto', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody({})
        .expectStatus(HttpStatus.BAD_REQUEST))
      // should sign up
      it('should sign-up', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody(SignupDto)
        .expectStatus(HttpStatus.CREATED))
      it('should not sign-up - credentials are taken', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody(SignupDto)
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
      // should sign up a second user
      it('should sign-up a 2nd user', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody(SignupDto2)
        .expectStatus(HttpStatus.CREATED)
        .stores('userAt2', 'token'))
      // should sign up a third user
      it('should sign-up a 3rd user', () => pactum
        .spec()
        .post("/auth/signup")
        .withBody(SignupDto3)
        .expectStatus(HttpStatus.CREATED)
        .stores('userAt3', 'token'))
    })
    describe('sign-in', () => {
      const SigninDto: SigninDto = {
        password: "123456789",
        username: "Artemixx",
        remember_me: false
      }
      // error: email is empty
      it('error: username is empty', () => pactum
        .spec()
        .post("/auth/signin")
        .withBody({ password: SigninDto.password })
        .expectStatus(400)
      )
      // error: username is empty
      it('error: password is empty', () => pactum
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
    describe('forgot-password (step 1 - receive email)', () => {
      const ForgotPasswordDto: ForgotPasswordDto = {
        username_or_email: "Artemixx"
      }
      // error: no body provided
      it('error: no body provided', () => pactum
        .spec()
        .post('/auth/forgot-password')
        .expectStatus(HttpStatus.BAD_REQUEST))
      // should return OK (sends email in the background)
      it('should return OK (sends email in the background)', () => pactum
        .spec()
        .post('/auth/forgot-password')
        .withBody(ForgotPasswordDto)
        .expectStatus(HttpStatus.OK)
        .stores('change-password-email-token', 'EMAIL_TOKEN__FOR_TESTING_ONLY')
      )
    })
    describe('forgot-password (step 2 - change password using email-token)', () => {
      // change forgotten password dto (dynamic fields)
      const ChangeForgottenPasswordDto = (verification_token: string): ChangeForgottenPasswordDto => ({
        new_password: 'new-password-yeahh',
        verification_token
      })
      // error: invalid token
      it('error: token is invalid', () => pactum
        .spec()
        .patch('/auth/forgot-password')
        .withBody(ChangeForgottenPasswordDto('some-invalid-token'))
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
      // error: invalid token (attempting to use login-token)
      it('error: invalid token (attempting to use login-token)', () => pactum
        .spec()
        .patch('/auth/forgot-password')
        .withBody(ChangeForgottenPasswordDto('$S{userAt}'))
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
      // should change forgotten password successfully
      it('should change forgotten password', () => pactum
        .spec()
        .patch('/auth/forgot-password')
        .withBody(ChangeForgottenPasswordDto('$S{change-password-email-token}'))
        .expectStatus(HttpStatus.OK)
      )
      // error: unauthorized (using old password)
      it('error: unauthorized (using old password)', () => pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          username: 'Artemixx',
          password: "123456789",
          remember_me: false
        } as SigninDto)
        .expectStatus(HttpStatus.FORBIDDEN)
      )
      // should signin with new password
      it('should signin with new password', () => pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          username: 'Artemixx',
          password: "new-password-yeahh",
          remember_me: false
        } as SigninDto)
        .expectStatus(HttpStatus.OK)
        .stores('userAt', 'token')
      )
    })
  })
  describe('User', () => {
    // User testing
    describe('get-user-data', () => {
      // error: no authorization header (unauthorized)
      it('error: no auth header', () => pactum
        .spec()
        .get("/user")
        .expectStatus(HttpStatus.UNAUTHORIZED))
      // error: invalid authorization header (unauthorized)
      it('error: invalid auth header', () => pactum
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
        .stores('userId', 'user_id')
      )
      // error: user does not exist
      it('error: user does not exist', () => pactum
        .spec()
        .get("/user/non-existing-user-id")
        .expectStatus(HttpStatus.BAD_REQUEST))
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
      it('error: unauthorized', () => pactum
        .spec()
        .patch("/user")
        .expectStatus(HttpStatus.UNAUTHORIZED)
      )
      // error: no body
      it('error: body not provided', () => pactum
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
        old_password: "new-password-yeahh",
        new_password: "even-newer-password-yoo"
      }
      // error: unauthorized (invalid auth header)
      it('error: unauthorized (no auth header)', () => pactum
        .spec()
        .post('/user/change-password')
        .expectStatus(HttpStatus.UNAUTHORIZED))
      // error: old-password is incorrect
      it('error: old-password is incorrect', () => pactum
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
    })
    /* have other functionality to check 0_0
    describe('delete-user', () => {
      // error: no authorization header (unauthorized)
      it('error: invalid auth header', () => pactum
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
        .expectStatus(HttpStatus.OK))
    })
    */
  })
  describe('LearningGroups', () => {
    const CreateGroupDto: CreateGroupDto = {
      title: 'Group 1',
      description: 'An interesting group to be in :S',
      members: [],
      tags: ["Tag-1"]
    }
    const JoinGroupDto = (verification_token: string): any => ({
      verification_token
    })
    describe('Create group', () => {
      // create a group
      it('should create a group', () => pactum
        .spec()
        .post('/group')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody(CreateGroupDto)
        .expectStatus(HttpStatus.CREATED)
        .stores('group_id', 'group_id'))
    })
    describe('Request-Join-Group (step 1 - receive email)', () => {
      // error: cannot join your own group
      it('error: cannot join your own group (user1 -> user1)', () => pactum
        .spec()
        .put(`/group/request-join/$S{group_id}`)
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .expectStatus(HttpStatus.BAD_REQUEST))
      // request-join a group
      it('should request-join a group (user2 -> user1)', () => pactum
        .spec()
        .put(`/group/request-join/$S{group_id}`)
        .withHeaders({
          'Authorization': 'Bearer $S{userAt2}'
        })
        .expectStatus(HttpStatus.OK)
        .stores('join-group-email-token', 'EMAIL_TOKEN__FOR_TESTING_ONLY')
        )
      // request-join a group
      it('should request-join a group (user3 -> user1)', () => pactum
        .spec()
        .put(`/group/request-join/$S{group_id}`)
        .withHeaders({
          'Authorization': 'Bearer $S{userAt3}'
        })
        .expectStatus(HttpStatus.OK)
        .stores('join-group-email-token-2', 'EMAIL_TOKEN__FOR_TESTING_ONLY')
        )
    })
    describe('Request-Join-Group (step 2 - allow group join request using email-token', () => {
      // invalid token
      it('error: invalid token (attempting to use auth-token)', () => pactum
        .spec()
        .post('/group/join')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt2}'
        })
        .withBody(JoinGroupDto('$S{userAt2}'))
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
      // join a group
      it('should join a group using a request link (user2 -> user1)', () => pactum
        .spec()
        .post('/group/join')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt2}'
        })
        .withBody(JoinGroupDto('$S{join-group-email-token}'))
        .expectStatus(HttpStatus.OK))
      // join a group
      it('should join a group using a request link (user3 -> user1)', () => pactum
        .spec()
        .post('/group/join')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt3}'
        })
        .withBody(JoinGroupDto('$S{join-group-email-token-2}'))
        .expectStatus(HttpStatus.OK))
    })
    describe('Invite-to-group (step 1 - receive email)', () => {
      const UpdateParticipantsDto = (action: listActionsEnum, roles?: string): UpdateParticipantsDto => ({
        action,
        roles,
        group_id: '$S{group_id}',
        user_id: '$S{userId}',
      })
      // invite a user
      it('should invite a user to a group', () => pactum
        .spec()
        .patch('/group/participants')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt2}'
        })
        .withBody(UpdateParticipantsDto(listActionsEnum.invite))
        .expectStatus(HttpStatus.OK)
        .stores('group-invitation-email-token', 'EMAIL_TOKEN__FOR_TESTING_ONLY')

      )
      // join a group
      it('should join a group using a request link', () => pactum
        .spec()
        .post('/group/join')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody(JoinGroupDto('$S{group-invitation-email-token}'))
        .expectStatus(HttpStatus.OK)
      )
    })
    describe('Get group data', () => {
      it('should get group data', () => pactum
        .spec()
        .get('/group/$S{group_id}')
        .expectStatus(HttpStatus.OK)
      )
    })
    describe('Update group data', () => {
      const UpdateGroupDto: UpdateGroupDto = {
        title: "New group title ayoo",
        description: "New group description let's goo!"
      }
      // error: unauthorized
      it('error: unauthorized', () => pactum
        .spec()
        .patch('/group/$S{group_id}')
        .withBody(UpdateGroupDto)
        .expectStatus(HttpStatus.UNAUTHORIZED))
      // error: forbidden update
      it('error: forbidden update', () => pactum
        .spec()
        .patch('/group/$S{group_id}')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt2}'
        })
        .withBody(UpdateGroupDto)
        .expectStatus(HttpStatus.FORBIDDEN))
      // update group data
      it('should update group data', () => pactum
        .spec()
        .patch('/group/$S{group_id}')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody(UpdateGroupDto)
        .expectStatus(HttpStatus.OK))
      // have other functionality to check 0_0 (groups)
      // // delete group
      // it('should delete group', () => pactum
      //   .spec()
      //   .delete('/group/$S{group_id}')
      //   .withHeaders({
      //     'Authorization': 'Bearer $S{userAt}'
      //   })
      //   .expectStatus(HttpStatus.OK)
      // )
    })
  })
  describe('Articles', () => {
    const CreateArticleDto: CreateArticleDto = {
      title: 'NEW: Fireworks in Minecraft 1.4.6!!!',
      content: 'Hello guys welcome to my youtube channel and today we\'re going to make some fireworks!',
      tags: ['tag-1'],
    }
    describe('Create an article', () => {
      // create a new article
      it('should create an article', () => pactum
        .spec()
        .post('/article')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody(CreateArticleDto)
        .expectStatus(HttpStatus.CREATED)
        .stores('article_id', 'article_id')
      )
    })
    describe('Get article data', () => {
      // get article data
      it('should get article data', () => pactum
        .spec()
        .get('/article/$S{article_id}')
        .expectStatus(HttpStatus.OK)
      )
    })
    describe('Update an article', () => {
      // forbidden update
      it('error: forbidden update', () => pactum
        .spec()
        .patch('/article/$S{article_id}')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt2}'
        })
        .withBody(CreateArticleDto)
        .expectStatus(HttpStatus.FORBIDDEN)
      )
      // update an article
      it('should update an article', () => pactum
        .spec()
        .patch('/article/$S{article_id}')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody(CreateArticleDto)
        .expectStatus(HttpStatus.OK))
    })
    describe('Like an article', () => {
      // unauthorized
      it('error: unauthorized', () => pactum
        .spec()
        .put('/article/$S{article_id}/dislike')
        .expectStatus(HttpStatus.UNAUTHORIZED))
      // unknown method
      it('error: like-parameter is invalid', () => pactum
        .spec()
        .put('/article/$S{article_id}/nope')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .expectStatus(HttpStatus.BAD_REQUEST))
      // like an article
      it('should like an article', () => pactum
        .spec()
        .put('/article/$S{article_id}/like')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .expectStatus(HttpStatus.OK))
    })
    // describe('Delete an article', () => {
    //   // forbidden update
    //   it('error: forbidden delete', () => pactum
    //     .spec()
    //     .delete('/article/$S{article_id}')
    //     .withHeaders({
    //       'Authorization': 'Bearer $S{userAt2}'
    //     })
    //     .expectStatus(HttpStatus.FORBIDDEN))
    //   // delete an article
    //   it('should delete an article', () => pactum
    //     .spec()
    //     .delete('/article/$S{article_id}')
    //     .withHeaders({
    //       'Authorization': 'Bearer $S{userAt}'
    //     })
    //     .expectStatus(HttpStatus.OK)
    //     )
    // })
  })
  describe('Comments', () => {
    const CommentDto: CommentDto = {
      data: "Awesome article! I really liked it."
    }
    describe('Comment on an article', () => {
      // comment on article
      it('should comment on an article', () => pactum
        .spec()
        .post('/article/$S{article_id}/comment')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody(CommentDto)
        .expectStatus(HttpStatus.CREATED)
        .stores('comment_id', 'comment_id')
      )
    })
    describe('Edit a comment', () => {
      //  forbidden
      it('error: forbidden editing', () => pactum
        .spec()
        .patch('/comment/$S{comment_id}')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt2}'
        })
        .withBody(CommentDto)
        .expectStatus(HttpStatus.FORBIDDEN)
      )
      //  edit a comment
      it('should edit a comment', () => pactum
        .spec()
        .patch('/comment/$S{comment_id}')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .withBody(CommentDto)
        .expectStatus(HttpStatus.OK)
      )
    })
    describe('Like a comment', () => {
      //  forbidden
      it('error: forbidden editing', () => pactum
        .spec()
        .patch('/comment/$S{comment_id}/dislike')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt2}'
        })
        .expectStatus(HttpStatus.FORBIDDEN)
      )
      //  invalid method-param
      it('error: invalid method-param', () => pactum
        .spec()
        .patch('/comment/$S{comment_id}/some-method')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .expectStatus(HttpStatus.BAD_REQUEST)
      )
      //  like a comment
      it('should like a comment', () => pactum
        .spec()
        .patch('/comment/$S{comment_id}/like')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .expectStatus(HttpStatus.OK)
      )
      //  dislike a comment
      it('should dislike a comment', () => pactum
        .spec()
        .patch('/comment/$S{comment_id}/dislike')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .expectStatus(HttpStatus.OK)
      )
    })
    // success: should get user data
    it('should get user data', () => pactum
      .spec()
      .get("/user")
      .withHeaders({
        'Authorization': "Bearer $S{userAt}"
      })
      .expectStatus(HttpStatus.OK)
      .stores('userId', 'user_id')
      )
    describe('Read notifications', () => {
      it('should mark \'read notifications\'', () => pactum
        .spec()
        .get('/user/notifications/0')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .expectStatus(HttpStatus.OK)
        )
    })
    describe('Delete a comment', () => {
      // forbidden comment delete
      it('error: forbidden delete comment', () => pactum
        .spec()
        .delete('/comment/$S{comment_id}')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt2}'
        })
        .expectStatus(HttpStatus.FORBIDDEN))
      // delete comment
      it('should delete comment', () => pactum
        .spec()
        .delete('/comment/$S{comment_id}')
        .withHeaders({
          'Authorization': 'Bearer $S{userAt}'
        })
        .expectStatus(HttpStatus.OK))
    })
  })
});
