document.addEventListener("DOMContentLoaded", () => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const renderPosts = () => {
    const postsContainer = document.getElementById("posts-container");
    if (postsContainer) {
      postsContainer.innerHTML = "";
      posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
                  <h3>${post.title}</h3>
                  <p>${post.description}</p>
                  <small>${post.time}</small>
                  <button onclick="deletePost(${index})">Delete</button>
              `;
        postsContainer.appendChild(postElement);
      });
    }
  };

  const renderEditPosts = () => {
    const editPostsContainer = document.getElementById("edit-posts-container");
    if (editPostsContainer) {
      editPostsContainer.innerHTML = "";
      posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
                  <h3>${post.title}</h3>
                  <p>${post.description}</p>
                  <small>${post.time}</small>
                  <button onclick="editPost(${index})">Edit</button>
              `;
        editPostsContainer.appendChild(postElement);
      });
    }
  };

  window.deletePost = (index) => {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
    renderEditPosts();
  };

  renderPosts();
  renderEditPosts();

  let timer;
  let time = 0;

  const timeInput = document.getElementById("time");
  const startTimer = document.getElementById("start-timer");
  const stopTimer = document.getElementById("stop-timer");
  const savePost = document.getElementById("save-post");

  if (startTimer && stopTimer && savePost) {
    startTimer.addEventListener("click", () => {
      timer = setInterval(() => {
        time++;
        timeInput.value = `${Math.floor(time / 60)}:${time % 60}`;
      }, 1000);
    });

    stopTimer.addEventListener("click", () => {
      clearInterval(timer);
    });

    savePost.addEventListener("click", () => {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const timeValue = timeInput.value;

      posts.push({ title, description, time: timeValue });
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();
      renderEditPosts();
      clearInterval(timer);
      time = 0;
      timeInput.value = "";
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
    });
  }

  // Editing post functionality
  const editTitle = document.getElementById("edit-title");
  const editDescription = document.getElementById("edit-description");
  const editTime = document.getElementById("edit-time");
  const continueTimer = document.getElementById("continue-timer");
  const stopEditTimer = document.getElementById("stop-edit-timer");
  const saveEdit = document.getElementById("save-edit");
  let editIndex;

  window.editPost = (index) => {
    editIndex = index;
    const post = posts[index];
    editTitle.value = post.title;
    editDescription.value = post.description;
    editTime.value = post.time;
    time = post.time.split(":").reduce((acc, time) => 60 * acc + +time);
  };

  if (continueTimer && stopEditTimer && saveEdit) {
    continueTimer.addEventListener("click", () => {
      timer = setInterval(() => {
        time++;
        editTime.value = `${Math.floor(time / 60)}:${time % 60}`;
      }, 1000);
    });

    stopEditTimer.addEventListener("click", () => {
      clearInterval(timer);
    });

    saveEdit.addEventListener("click", () => {
      posts[editIndex] = {
        title: editTitle.value,
        description: editDescription.value,
        time: editTime.value,
      };
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();
      renderEditPosts();
      clearInterval(timer);
      editIndex = null;
      time = 0;
      editTitle.value = "";
      editDescription.value = "";
      editTime.value = "";
    });
  }
});
