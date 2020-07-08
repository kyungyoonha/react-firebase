firebase. 데이터 베이스 뿐아니라 서버 API기능까지 제공한다.
firebase. 일반적으로 사용자의 요청이 있을 때 웹서버에서 받고 데이터 베이스 연동하여 저장
firebase. 웹서버 + 데이터베이스 통합
firebase. 온전히 서버 전체 기능을 제공할 수 있다.


firebase. hosting. 프로젝트 배포
firebase. hosting. 

react. build. yarn add --dev copy-webpack-plugin
react. build. webpack.config.js > plugin 추가
react. build. yarn add -g firebase-tools
react. build. firebase login
react. build. firebase init
react. build. hosting > wordCloud > public directory? build > y (single page) > n (ovewrite) : firebase껀 필요x 이미 yarn build로 만들었음
react. build. firebase deploy : build 안에 폴더를 배포해준다.
react. build. .gitignore => firebase관련 파일은 업로드x

react. react-text-truncate: 글자수 일정 이상이면 생략해준다.

react. webpack. babel-loader

react. webpack. 폰트. style-loader. 설치. yarn add style-loader
react. webpack. 폰트. module rule에 추가해준다.
react. webpack. 폰트. css-loader. 설치. yarn add css-loader


css. !important 같은 속성을 여러번 적용해도 우선순위로 적용된다. 나중에 설정한 값이 적용되지 않도록 함.