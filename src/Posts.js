  
// generate html, event listeners
class Posts{
    constructor() {
        this.posts = []
        this.adapter = new PostsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadPosts()
      
    }

    initBindingsAndEventListeners() {
        this.postsContainer = document.getElementById('posts-container')
        this.postForm = document.getElementById('new-post')
        this.postTitle = document.getElementById('new-post-title')
        this.postContent = document.getElementById('new-post-content')
        this.postForm.addEventListener('submit', this.createPost.bind(this))
    }
  
    createPost(e) {
        e.preventDefault()
        const title = this.postTitle.value
        const content = this.postContent.value
      
        if(title.trim().length > 0 && content.trim().length > 0) {
            this.adapter.createPost(title, content).then( post =>{
                this.posts.push(new Post ( post ))
                this.postTitle.value = ''
                this.postContent.value = ''
                this.render()
            })
        } else {
            alert("Post not long enough!")
        }
    }
   
    fetchAndLoadPosts(){
        this.adapter
        .getPosts()
        .then( posts => {
            posts.forEach( post => this.posts.push(new Post(post)))
        })
        .then( () => {
            this.render()
        }) 
    }

    render(){
        this.postsContainer.innerHTML = this.posts.map(post => {
           return post.renderPostList()}).join('')
       
        this.commentButton = document.querySelectorAll("#commentBtn")
        this.commentButton.forEach((button) => {
            button.addEventListener('click', this.setComments.bind(this, button), {once: true})
            button.addEventListener('click', this.createCommentForm.bind(this, button), {once: true})
        })
       
    }
   
    setComments(ele) {
        const post =  this.posts.find((post) => {
            return post.id === parseInt(ele.dataset.id)
        })     
        this.displayComments(post)
   }

   displayComments(post) {  
    const postEle = document.querySelector(`.post-${post.id}`)
    const div = document.createElement("div")  
    div.innerHTML = ""
    post.comments.forEach((comment) => {
        const content = document.createElement("p")
        content.classList = `comment ${comment.id}`
        content.textContent = `comment: ${comment.content}`
        div.appendChild(content) 
      })
      
    postEle.appendChild(div)
   }



    createCommentForm(ele) {
        const form = document.createElement("form")
        const textBox = document.createElement("input")
        const submit = document.createElement("button")
        
        submit.textContent = "Submit"
        submit.classList.add("btn", "btn-primary", "comment-submit")

        textBox.name = "commentContent"
        textBox.setAttribute("type", "text")
        textBox.placeholder = `Enter a comment:`
        textBox.classList.add("form-control", "comment-input")

        form.setAttribute("data-id", ele.dataset.id)
        
        form.append(textBox, submit)
        ele.parentElement.appendChild(form) 
        form.addEventListener('submit', (e) => {
        e.preventDefault()
            
        this.postComment(e)
       })
   }
   
   postComment(e) {
       console.log(e.target)
        const content =  e.target.elements.commentContent.value
        const postId = e.target.dataset.id
        const post = this.posts.find((post) =>  post.id === parseInt(postId))
        if(content.trim().length > 0) {
            this.adapter.createComment(content, postId)
            .then( comment => {
                post.comments.push(new Comment(comment))
                    this.render()
                })
                .catch(err => {
                    alert(err.status)

                })
        } else {
            alert("Post not long enough!")
        }
    }

}
