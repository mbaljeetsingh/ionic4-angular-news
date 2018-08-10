import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss']
})
export class NewsPage implements OnInit {
  data: any;
  page = 1;
  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit() {
    this.newsService
      .getData(
        `top-headlines?country=us&category=business&pageSize=5&page=${
          this.page
        }`
      )
      .subscribe(data => {
        console.log(data);
        this.data = data;
      });
  }

  onGoToNewsSinglePage(article) {
    this.newsService.currentArticle = article;
    this.router.navigate(['/news-single']);
  }

  loadMoreNews(event) {
    this.page++;
    console.log(event);
    this.newsService
      .getData(
        `top-headlines?country=us&category=business&pageSize=5&page=${
          this.page
        }`
      )
      .subscribe(data => {
        // console.log(data);
        // this.data = data;
        for (const article of data['articles']) {
          this.data.articles.push(article);
        }
        event.target.complete();
        console.log(this.data);
      });
  }
}
