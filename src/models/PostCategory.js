module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
      tableName: 'posts_categories',
      underscored: true,
    }
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return PostCategory;
};