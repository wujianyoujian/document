# Angular
> 使用手脚架进行开发
## Angular-cli
* 安装
> `cnpm install -g @angular/cli`

* 使用
> `ng new <appName>`


## 初始化
* 默认页面的显示文件为`app.component.html`, 删除所有内容，添加自定义的内容
* 页面全局样式在`style.css文件中`, 局部样式文件为`app.component.css`

* 一个组件就是由四个文件组成
> `component_name.component.html`  
> `component_name.component.css`  
> `component_name.component.ts`  
> `component_name.component.spec.ts`  

## 基础`API`的使用
### 在组件中定义属性, 显示值
```typescript
// 在导出的类中添加属性

// hero.ts
export interface Hero {
  name: string,
  id: number
}
// Heroes.component.ts
export class HeroesComponent implements OnInit {
  hero: Hero;
}
```

> 在对应的html中直接使用`{{}}`

### 添加组件
> `ng generate component heroes`

> 会自动在`./src/app`下的目录添加一个`heroes`组件目录
```typescript
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
```

已经在`app.module.ts`声明了, 使用上面的`app-heroes`,可以在任一个html中导入这个组件，如`<app-heroes></app-heroes>`


### 双向绑定数据
> 一般在框架中双向绑定都是使用`input`

```html
<div>
  <input [(ngModel)]="hero.name" placeholder="name" />
</div>
```

需要在`app.module.ts`中导入`FormsModule`才能使用
```typescript
import { FormModule } from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ]
})
```

### 循环渲染
* 这样就可以循环渲染出在组件里面定义好了的属性了
```html
<li *ngFor="let hero of heroes">
  <span>{{hero.name}}</span>
</li>
```
* 自动订阅 Observable
```html
<li *ngFor="let hero of heroes$ | async">
    <span>{{}}</span>
</li>
```

### 判断指令
```html
<div *ngIf="hero"></div>
```

### 绑定事件
#### 点击事件
`<li (click)="selecedHero(hero)"></li>`

#### 监听input输入
* 使用本地变量，通过`heroName`来获取input的值
`<input #heroName (input)="search(heroname.value)">`

### 父组件传值给子组件
1. 创建一个子组件`ng generate component hero-detail`

2. 定义一个需要传过来的值(就像`vue`中的子组件当中的`props`一样)

    ```typescript
    import { Input } from '@angular/core'

    @Input() hero: Hero
    ```

1. 在父组件中绑定子组件的值
```html
<!-- 这就是将父组件里面selectedHero的值传递给了子组件的hero -->
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

### 父组件调用子组件的方法
#### 使用本地变量
```html
<button (click)="timer.start()"></button>
<child-component #timer></child-component>
```

### 样式绑定
```html
<!-- 判断是否有这个类名 -->
<li [class.selected]="hero === selectedHero"><li>
```
### 路由
* `Router`
> this.router.url 当前路由的路径
> this.router.events 当前路由的过程事件（也是可观察对象）
* `ActivatedRoute`
> this.route.data 当前路由所带上的数据, 再路由中data定义好了的数据或者resolve中定义好了的数据

#### 监听路由变化
```typescript
import { Router, NavigationEnd } from '@angular/router';

constructor(private router: Router)

OnInit() {
    this.router.events.pipe(
        // 过滤一些路由事件
        filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
        // 获取导航后的完整url, 当路由发生改变的时候，就会被订阅
        let path = event.url;
    })
}
```

#### 在组件加载之前通过路由获取数据
1. 创建一个服务，这个服务用来获取数据，指在组件加载之前就获取到，再渲染出来
2. 这个服务类需要继承路由中的Resolve这个类
3. 还需要重写resolve这个方法, 这个方法就返回一些数据的observable对象
4. 在路由中进行定义, 使用resolve这个参数, 定义一个属性名，属性值就是这个服务类
5. 还需要在路由中的providers中添加这个类
6. 在使用到组件中使用ActivatedRoute, 上的data属性来获取值


```typescript
// 创建服务
//使用到了forkJoin方法类似于promise-all
import { Resolve } from '@angular/router';


export class HomeResolveService implements Resolve<HomeData> {

  constructor(
    private homeServ: HomeService,
    private singerSer: SingerService
  ) {}

  resolve(): Observable<HomeData> {
    return forkJoin({
      Banners: this.homeServ.getBannerList(),
      HotTags: this.homeServ.getHotTagList(),
      SongSheets: this.homeServ.getSongSheetList(),
      Singers: this.singerSer.getEnterSingerList()
    }).pipe(first())
  }
}
// routing
{   path: 'home', 
    component: HomeComponent,
    data: { title: '发现' },
    resolve: { homeDatas: HomeResolveService }
}

providers: [HomeResolveService]

// ts
constructor(
    private route: ActivatedRoute
)

ngOnInit(): void {
    // 就能获取到上面定义的data和resolve里面的键值对了
    this.route.data.pipe(
        map(res => res.homeDatas)
    ).subscribe(res => {
        // ....
    })
}
```

### 添加服务

### 使用angular里面的http请求api
* 返回的就是一个可观察对象
在`app.module`里面导入这个

```typescript
import { HttpClient } from '@angular/common/http';
import  {NgModule} from "@angular/core";

@NgModule({
    imports: [ HttpClient ]
})

```

```typescript
import Hero from './src/app/hero'
import { Observable } from "rxjs";

getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl);
}

```
#### 错误处理
```typescript
return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );

handleError<T>(operateion = 'operation', result?: T) {
    // 处理错误，如果参数result有值就会返回一个泛型
    return (error, any): Observable<T> => {
      console.error(error);
      this.log(`${operateion} failed: ${error.message}`);

      return of(result as T);
    }
  }
```

### obserable中的pipe操作

### 一些常用的命令
* 生成一个模块，导入指定模块中  
> `ng generate module app-routing --flat --module=app`

```typescript
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
    { path: 'heroes', component: 'HeroesComponent' }
]

@NgModule({
    import: [RouterModule.forRoot(routes)],
    export: [RouterModule]
})
export class AppRoutingModule { }
```
再在根模块上进行声明
* 生成一个服务  
> `ng generate service InMemoryData`

### 错误注意
* <font color="#f00">Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i @types/node` and then add `node` to the types field in your tsconfig.</font>
> 运行`npm i @types/node`
> 将tsconfig.app.json加入如下的配置
```json
compilerOptions": {
   "types": ["node"]
}
```