// custom class

class Post {
    constructor(postJSON){
        this.id = postJSON.id
        this.title = postJSON.title
        this.content = postJSON.content
        this.comments = postJSON.comments.map((comment) => {
            return new Comment(comment)
        })
    }
    
    renderPostList(){
        return `
            <div class="text-center">
                <div class="card post" data-id="${this.id}">
                    <div class="card-body">
                        <h4 class="post-title" data-id=${this.id}> ${this.title} </h4>
                    </div>
                    <div class="card-text>
                        <p class="post-content" data-id=${this.id}> ${this.content} </p>
                    </div>
                    <div class="interactive-comments post-${this.id}"> 
                        <button class="btn btn-primary comment-create" data-id=${this.id} id="commentBtn">Make a comment here </button> 
                    </div>
                </div>
            </div>
        `
        
    }

}