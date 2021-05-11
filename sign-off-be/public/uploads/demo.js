const topics = [
    {
      topic: "ReactJS",
      posts: [{ postID: "id1", title: "title1" }, { postID: "id2", title: "title2" }]
    },
    {
      topic: "Vue.js",
      posts: [{ postID: "id3", title: "title3" }, { postID: "id4", title: "title4" }]
    }
  ];
  let temp = topics.reduce( (arr, topics) => {
      return arr = {...topics.topic}
  },topics)
  console.log(temp)