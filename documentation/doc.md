**News24x7**

**Introduction:**

News24x7 is a website for users to have discussions on various topics. Users can submit links to other web pages with a predefined format and each such submission generates a thread for other users to post their opinions on the link. The website has a convenient user interaction system. Users can reply to each other&#39;s comments and can up-vote or down-vote on posts and comments. The user can react to a particular post regarding his relevance of the post. The comments can also be classified as positive and negative comments. Each post will have it&#39;s tags and the user can filter the news according to his preferences. The user can also bookmark the posts. The website encourages an organized conversation between users and aims to create a good online community.

**User Stories with Acceptance Criteria:**

| **User Story** | **Acceptance Criteria** |
| --- | --- |
| As a registered user, I should be able to log out from the account |- Test with session timeout. 
||- After logging out, the user can only see the generalised feed
||- Cannot upvote,downvote, comment,bookmark,report on posts.
||- Test with unregistered user
||- Cannot view profile of own and other users
| As an unregistered user, I should be able to create a profile/login using email verification to comment, like, bookmark posts. | - Test with illegal entries
||- Test with empty information
||- Test with fake email
||- Upvoting a post increments number
| As a user, I want to view trending, recent, most liked posts |- The post appearing on the screen has the highest number of likes.
||- Posts are being sorted in descending order based on the number of likes in real time.
||- Recent post is the one uploaded in the latest time.
||- Posts are sorted in descending order based on the date and time of posting
| As a user, I should be able to search a user to view his activity and account details |- Search based on username
||- Test with unregistered accounts
||- Test with fake username
| As a user, I should be able to search threads and/or posts according to my interests(specified tags) |- Functioning search bar based on key phrases.
||- Fetch the post / article based on the search phrase
| As a registered user, I should be able to bookmark any post. |- Test if logged in or not
||- Test with clicking bookmark icon twice
||- Bookmarking a post should notify &quot;View your bookmarks&quot;
| As a registered user, I want to have a personalised feed to view posts according to my interests (followed tags and/or users) |- Test with tag that does not exists
||- Test with user who is not being followed
||- Test with unregistered user
||- Only the posts with followed tags or users appear on the screen.
| As a registered user, I should be able to create a post with a link and tags to start a discussion on it |- Created post appears in the owner&#39;s activity.
||- Created post appears on the feed when sorted according to recent
||- Owner&#39;s followers can see the post on personalized feed
| As a registered user, I want to comment on posts or other comments |- Test with empty comment
||- Test with unregistered user
||- Added comment appears below the post
| As a registered user, I want to like or unlike a post and/or comment |- Test more than one like/unlike on same post
||- liking a post/comment increments number of likes by one
||- unliking a post/comment decrements the number of likes by one.
||- Test with more than upvotes on same comment
||- Test with unregistered user
| As a registered user, I should be able to follow tags and other registered users to view specific posts on personalised feed |- The posts of my following users get added to my personalised feed.
||- Test with unregistered users
||- Test with unfollowed tags
| As a registered user, I should be able to add a poll on a post to conduct a survey |- A poll which reflects the views of the other users can be added to a post.
||- Test with unregistered user
| As a registered user, I should be able to edit my own posts |- An earlier news post can be edited later on as per the user&#39;s requirements.
| As a registered user, I should be able to delete my own posts |- An earlier news post can be deleted later on as per the user&#39;s requirements.
||- The post no longer appears on the activity
||- The deleted post is not visible to anyone including owner&#39;s followers
||- The post if it existed in other user&#39;s bookmarks gets removed.
| As a registered user, I should be able to report a post if it does not follow community guidelines to have it removed |- Admin will receive data of the reported posts by the users and such posts will be removed if there are a high number of reports.
| As a registered user, I want to bookmark posts so that I can view them later |- A particular post can be bookmarked and gets added to the bookmarks page of the user so that it may be referred later quickly.
||- Test with unregistered user
| As a registered user, I should be able to view my followers and following users to view their posts |- Various profiles of the following and followed users can be visited to see their posts.
||- Test with unregistered user
||- Test with users not being followed
| As a registered user, I want to get notifications about likes or comments on my posts |- The user gets an email notification when his post gets an like or any user comments on the post.
||- Test with unregistered user
| As a registered user, I should be able to share posts on other social media platforms |- The link of the news can be shared to various other platforms like WhatsApp, Gmail etc.
||- Test with empty post
||- Test with unregistered user
| As a registered user, I should be able to recover my account in case I forget account details using email verification |- A link for changing the password is sent to the users email if the user forgets the password and requests for change.
||- Test with unregistered account
||- Test with entering old password in new password details
||- Test with fake details in setting new password
||- Test with empty new password
| As a user, I should be able to access a link mentioned in the post to be able to read news |- Test with fake link
| As an admin, I should be able to remove posts with high number of reports to improve online community and provide desirable feed |- The posts which are reported more than a threshold number of times is removed
||- Test with a post reported x number of times less than threshold
||- Test the violation of community guidelines
| As an admin, I should be able to periodically add news posts to the feed from authenticated news providers. |- The news from various news providers gets added on the website periodically like after 4 hours and is added to the generalised feed.
||- Test unauthorized news provider
||- Test in personalized feed
||- Test in less than 4 hours

**Functional Requirements:**

1. Profile : Unique handle
2. Login/signup for creating post, commenting , upvotes , downvotes
3. Email verification and forgot password
4. A person should be able to comment ,post and share
5. User can add a poll along with posts
6. Tags for each post
7. Filter news based on tags
8. Follow tags
9. Tag-wise section
10. Sorting feature based on recent,trending, max number of votes
11. Delete post by user/owner of that post
12. Report a post by admin if it doesn&#39;t satisfy community guidelines
13. Local and International post
14. News provider can dynamically post headlines of recent news
15. Relevance of post by user
16. Search based on title or tags
17. A user can bookmark posts

**Non-Functional Requirements** :

1. Reliability: Invalid links can be reported by users.
2. Scalability: ~2,00,000 users can access the application simultaneously
3. Availability: The application should be functional 24 x 7
4. Security: One can post, comment and upvote/downvote only after logging in.

**Design And Architecture:**

**Idea:**

The main aim of news24x7 was to provide users a portal to share new news and discuss about the news. The aim was to build a system to post, comment and like through which users can express their views.

**Technologies Used:**

Back-end part, i.e. building the api and creating a database storage.

- Firebase functions (for hosting API&#39;s)
- Firestore (for cloud DB storage)
- Node.js &amp; express(for writing the logic of API&#39;s)

Front-end part, i.e. designing the website and building the web pages.

- React [JavaScript FrameWork] (for making different components of the website)
- Redux (to maintain a global state of the data)
- HTML &amp; CSS
- Material UI (for styling purpose)

Hosting
- Heroku


**Class Diagram:**


**Activity Diagram:**


**Database ER Diagram:**

