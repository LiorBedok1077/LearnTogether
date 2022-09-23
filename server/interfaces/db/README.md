# Database model interfaces

The following database-model-interfaces (User, Article, Comment, LearningGroup, Role, FavoriteTag\*, Notification\*) can be used across the server, for type-checking.

* FavoriteTag: this model will be moved to another, search-based database like elasticsearch.
  * Notification: this model will most likely be moved to another database, same as `FavoriteTags`.

Some are temporary, and they all will obey any changes occuring to the original `prisma` file, during development.