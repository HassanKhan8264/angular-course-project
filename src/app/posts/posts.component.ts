import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from './Post.model';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  postForm: UntypedFormGroup;
  posts: Post[];
  error = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postForm = new UntypedFormGroup({
      title: new UntypedFormControl(null, Validators.required),
      content: new UntypedFormControl(null, Validators.required),
    });
    this.getPosts();
  }

  getPosts() {
    this.postService.fetchPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.log(error);
        this.error = error.message;
      }
    );
  }

  onCreatePost() {
    const postData: Post = this.postForm.value;
    this.postService.createPost(postData).subscribe((response) => {
      console.log(response);
      this.getPosts();
    });
  }

  onClearPosts(event: Event) {
    event.preventDefault();
    this.postService.clearPosts();
    this.posts = [];
  }
}
