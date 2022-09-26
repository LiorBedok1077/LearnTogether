# LearnTogetherProject (name subject to change)

The project's full demo characterization document can be found [here](https://docs.google.com/document/d/1D0mCEIvOaxY59KTM-g_nJRIdwTGi3soBM8SFJZVj-m0/edit#).

## Overview

- [LearnTogetherProject (name subject to change)](#learntogetherproject-name-subject-to-change)
  - [Overview](#overview)
  - [Requirements (21.9)](#requirements-219)
  - [Development instructions](#development-instructions)
  - [Description](#description)
    - [UX emphasis](#ux-emphasis)
    - [User ranks](#user-ranks)
    - [Economic model](#economic-model)
  - [Front-end arcitecture](#front-end-arcitecture)
  - [Back-end architecture](#back-end-architecture)
    - [Technnologies](#technnologies)
    - [Routes (initial recap)](#routes-initial-recap)
    - [Responses (on different events)](#responses-on-different-events)
  - [Database architecture](#database-architecture)
    - [Database model](#database-model)
    - [Database flowchart](#database-flowchart)


## Requirements (21.9)

- Node.js - v16+
- Docker, with the neccesary images:
  - CockroachDB - latest

## Development instructions

From the project's root directory, run:
```cmd
npm run dev
```
As of `21.9.22`, this will run 3 processes:
- Server (Nest.js) on port 5000
- Client (Next.js) on port 3000
- CockroachDB on ports 8080 (db-client), 26257 (insecure-sql-connections)

## Description

A platform for mediating and creating study groups, and connecting users from around the world for joint learning.

The platform contains:
- A bridging system between users from around the world under different learning groups. 
  - Anyone can open a learning group, describing the level of the initial group, what the final goal is, and during the progress of the group to update where they are at the moment.
  - People will be able to join groups based on the languages ​​spoken, the area where they live, to choose advanced filtering options such as language and geographic region
  - In each group room the preferred communication platform will be displayed (Discord/Skype/etc.) 
  - Possibility to attach learning materials and their catalog by folders 
  - Option for private groups - it is necessary to send a request with a simple detail about yourself and your knowledge 
  - Writing in advance of the number of days the learning group will sit a week (once/twice/every day), and the hours of sitting (morning/noon/evening) 
- Articles and videos to improve learning abilities 
- Private teachers 
  - The lessons will be conducted in Zoom. 
  - Lesson recording.
  - Automatic counter that knows how much to charge.
- Feed system
  - The more you scroll down more provocative content.
  - One for several learning groups Advertisement 
  - Filters based on relevance - presentation of the hot content together with the new content, plus additional filtering options
- Rewards system
  - Any user can get likes. The more likes a user has, the more promoted his learning groups will be, the more people will want him to join their group (because he can contribute a lot)
  - Starting with X likes, the user will be able to upload articles to the site. These articles will be able to get likes and promote the user even more.
  - Starting with 2X likes, users will be able to enjoy a 10 percent discount on the private lessons on the site (essentially offsetting the commission we take)
  - Starting with 3x likes, the user will be able to advertise himself as a private teacher


### UX emphasis

1. Each form will be divided into small SECTIONS to minimize cognitive load on the user. For example, a registration page that is divided into a SECTION of personal details, then a SECTION of personal details, then a SECTION of selecting a photo.
2. To combine similar options and allow the user as few options as possible regarding choices, in order to reduce cognitive load (of course depending on the situation, as long as there is no option, even 5 options are possible)
3. Working with universal conventions, for example a hamburger button to separate a page, a tendency to combine navigation links at the bottom and at the top of the site.
4. In places where there is a load of information (for example terms of use or a description of a learning group) write the text in the font that allows the fastest reading (new roman is in first place)
5. Psychology of colors - match colors on the site to the purpose. A red example for places that require attention.

### User ranks
1. New student - basic permissions, which include joining and creating learning groups, editing a personal profile, and giving likes to website users.
2. Learning supporter - added access to the personal article management system, which allows adding, editing, and deleting personal articles. Can be received automatically after accumulating X likes
3. Guide - added access to the private lessons system, which allows creating a teacher profile and managing a personal teaching system. Can be received automatically after receiving 3X likes
4. Supervisor - added access to the supervision system, which allows deletion/blocking of content that does not match the spirit of the site (users, teacher profiles, learning groups and articles) is given manually by the general supervisors.
5. General inspector - added access to the platform management system

### Economic model
1. Advertisements on the website - at a discount and each user will browse 10 pages while on the website, for every 1000 users connected per day 3,750 per month.
2. About 10 percent commission on private lessons on the website - for every 1000 users logged in per day, there will likely be 30 private teachers. At a discount and everyone gives 5 lessons a month, their estimated profit is about 1,200 a month.
3. For every 1000 users connected to the site, expected expenses of about NIS 150 per month.

**In summary, for every 1000 users an estimated profit of about NIS 4500 per month**

**Target audience - about 2,000,000,000 learners worldwide, about 2,000,000 learners in Israel in particular.**


## Front-end arcitecture

- Technologies:
  - Probably Next.js - React.js for production
- Pages:
  - Homepage
    - Hot, personalized learning groups.
    - Hot articles.
    - Personalized private teachers.
    - New learning groups.
    - Learning-gorups search capability.
  - Articles & videos - new, hot articles; searching capability
    - My articles (if authorized) - editing, deleting, reading, creating.
    - Creating new article (if authorized) - title, description, content, video & image uploading.
  - Private tutors - custumized PTs, highest-ranked PTs, newly created PTs, search capability.
    - Creating new PT profiles (if authorized).
    - Managing PT profiles (if authorized).
    - Classes system management - upcoming classes (editing / deleting), revenues, statistics, real-time Zoom-classes managment (with automated counter). User can add a bank account to transfer payments; promote a tutor's profile to the top of the list in the field, for a certain monthly cost.
  - My profile - show personal information, likes amount, profile picture, bio, rank, last-seen-active learning-groups and activity time.
    - Update personal details - profile, payment-methods and delete-user.
    - Log out
  - Login system
    - Signup / login to the website.
    - Forgot your password?
    - Remember me.
  - Monitoring system
    - Display of all content that has been reported as violating procedures - option to view/edit/delete/block users/teachers/profiles/articles/learning-groups.
  - Content management system
    - User management system - add/view/delete/edit/block users. Statistics will be displayed per user regarding favorite categories and average browsing time per day on the site.
    - Learning-groups management system - view/delete/edit learning groups.
    - Private-tutors management system - view/delete/edit private tutors.
    - Statistics - general statistics will be displayed regarding preferred categories, in terms of learning groups, articles, and teachers. In addition, the level of popularity of each learning group/article/teacher will be displayed with the possibility of changing the range (today, month, year).
    - Profit management system - a unique category for profit statistics with the possibility of changing the range (today, month, year) and filtering according to the source of profit (private lesson fee/advertisements)

## Back-end architecture

### Technnologies
- Nest.js - Typescript-based server environment.
- Prisma - Authomation system for database queries construction, allowing access to database through prebuilt typescript methods.
- Nest.js testing modules, .rest files - special testing libraries for the nest.js server.

### Routes (initial recap)
  * Auth route:
    * Signup - create users route.
      * Method: POST
      * Body:
        * username		    String,
        * password		    String,
        * email			    String,
        * full_name		    String (separated by " "),
        * prefered_langs	Enum[] (at least 1)
        * file			    File? (profile picture - optional)
        * bio			    String?
        * gender		    Enum
        * interests 		String[]
    * Login
      * Method: PATCH
      * Body:
        * username_or_email String
        * password          String
        * remember_me       Boolean
    * Get user data - private data only goes to authorized users.
      * Request
        * Method: GET
      * Params:
        * user_id	String?
      * CMS options:
        * increment num_viewed_profile on first request
    * Update user data (username, email, etc).
      * Method: PATCH
      * Body:
        * username?	        String,
        * email?		    String,
        * full_name?	    String  (separated by " "),
        * prefered_langs    Enum[]? (at least 1)
        * file?			    File (profile picture - optional)
        * bio?			    String
        * gender		    Enum
        * interests?		String[]
    * Delete user.
      * Method: DELETE
  * Groups route:
    * Create a group.
      * Method: POST
      * Body:
        * thumbnail 	File?
        * title			String
        * description	String
        * members		String[]
        * tags			String[]
    * Send a request to join a group.
      * Method: PUT
      * Params:
        * group_id	String
    * Invite / remove users from a group.
      * Method: PUT
      * Params:
        * group_id	String
      * Body:
        * roles		Enum[]
    * Get group details.
      * Method: GET
      * Params:
        * group_id	String
    * Update group details.
      * Method: PATCH
      * Params:
        * group_id		String
      * Body
        * thumbnail	    File?
        * title			String
        * description	String
        * members		String[]
        * tags			String[]
        * goals			String[]
        * progress		Int
    * Delete group.
      * Request
        * Method: DELETE
      * Params:
        * group_id		String
  * Articles route:
    * Create articles.
      * Method: POST
      * Body:
        * thumbnail		File
        * title			String
        * content		    String
        * tags			Tags[]
    * Edit articles.
      * Method: PATCH
      * Body:
        * thumbnail		File
        * title			String
        * content		    String
        * tags			Tags[]
    * Delete articles.
      * Method: DELETE
      * Params:
        * article_id		String
    * Like / unlike articles.
      * Method: PUT
      * Params:
        * article_id		String
    * Comment on other articles.
      * Method: POST
      * Body:
        * data			String
    * Edit article comments.
      * Method: PATCH
      * Params:
        * comment_id	String
      * Body: 
        * data		String
    * Like / unlike article comments.
      * Method: PATCH
      * Params:
        * comment_id	String
  * Tutors route:
    * – later –
  * Private lessons route:
    * – later –
  * CMS route:
    * View profile - adds 
  * **– all other routes will be detailed here later –**
      * Private tutor profiles
      * Private lessons system
      * Reports system
      * Statistics system
      * Profit management system

### Responses (on different events)

- Normal response:
  - Code: SUCCESS_CODES
  - Body:
    - status	true
    - message	string
    - data		any? (request-dependent)
- Error response:
  - Code: ERROR_CODES
  - Body:
    - status	false
    - message	string
    - why		string?




## Database architecture

Last update: 8 Aug, 2022

Database: postgresql

Tables: Users, Learning_groups, Articles, Comments, Roles, Tags, Favorite_tags (extends: *Tags*).

### Database model
```yaml
Users:
    # user data:
    user_id:            uuid    (unique)
    username:           String  (unique)
    email:              Email   (unique)
    full_name: 	        String
    password:	        String 	(hashed)
    created_at:	        DateTime
    role:		        Roles
    profile_pic_src:    String?
    # personal data:
    phone_number:   String?
    gender: 	    enum
    bio:    		String?
    interests:  	String[]
    prefered_langs: enum[]
    favorite_tags:	Favorite_tags[]
    # social media:
    num_stars:  		    Int         (default=0)
    stars_given:    		Users[]
    articles:   		    Articles[]
    comments:   		    Comments[]
    articles_likes_given:   Articles[]
    comments_likes_given:   Comments[]
    # learning groups:
    created_groups:		    Learning_groups[]
    participating_groups:	Learning_groups[]
    # roles data (according to role access–modifier):
    # — (teacher_data, admin_data, etc) — 
    # cms:
    num_viewed_profile:     Int	(default=0)
    num_edited_profile:     Int	(updatedAt)
    # ... other cms properties
    notifications:			Notification[]

Learning_groups:
    group_id:       uuid	(unique)
    user_id:	    uuid
    user:		    User	@relation(fields: [user_id], references: [user_id])
    thumbnail_src:	String
    title:			String
    description:	String
    members:		User[]
    tags:			Tags[]
    goals:			String[]
    progress:		Int		# length of goals

Articles:
    article_id:		uuid		(unique)
    user_id:		uuid
    user:			User		@relation(fields: [user_id], references: [user_id])
    created_at:		DateTime	(default=now)
    updated_at:		DateTime?	(updatedAt)
    thumbnail_src:	String
    title:			String
    content:		String
    tags:			Tags[]
    likes:			Users[]
    comments:		Comments[]
    num_views:		Int

Comments:
    comment_id:		uuid		@unique
    article_id:		uuid
    article:		Article 	@relation(fields: [article_id], references: [article_id])
    author_id:		uuid
    author:		    User		@relation(fields: [author_id], references: [user_id])
    created_at:		DateTime	(default=now)
    updated_at:		DateTime?	(updatedAt)
    data:			String
    likes:			Users[]

Roles:
    role_id:			uuid	(unique)
    role_name:			String
    min_rate:			Int?
    accessable_pages:	enum[]
    accessable_routes:	enum[]

Tags:
    tag_name:			String	(unique)
    num_articles_used:	Int		(default=0)
    num_groups_used:	Int		(default=0)
    num_tutors_used:	Int		(default=0)

Favorite_tags:
    tag_name:	String	
    tag:		Tag		@relation(fields: [tag_name], references: [tag_name])
    num_viewed:	Int		(default=0)

Notifications:
    notification_id:    uuid	(unique)
    user_id:		    uuid
    user:			    User	@relation(fields: [user_id], references: [user_id])
    title:			    String
    description:	    String
    link:			    String?
    user_pic_src:	    String?
    thumbnail_src:	    String?
    created_at:		    Date	(createdAt)
```

### Database flowchart

![database relations flowchart](https://lh3.googleusercontent.com/GjoivxxEq5gvsu5Y2skzVj_OQEODrsb1N2P7F5x4rmkLwqoM_cEa7R3NwtpgY9oYDE58gv_Y807X7E5DCP2Jd1pfAW3F78b9plaFiUYfd-JG2Pe6EflkL2gj5vqmVse2oZqqtXwEWzwqkrNoZWzwmX5NaKyqO3M-567UNVSKz3hYxzDhI6_ZdqV_Qw)