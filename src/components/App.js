import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './AppShell';
import Home from './Home';
import Words from './Words';
import Texts from './Texts'

class App extends React.Component{
    render(){
        return(
            <Router>
                <AppShell>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/texts" component={Texts} />
                        <Route exact path="/words" component={Words} />
                    </div>
                </AppShell>
            </Router>
        )
    }
}
export default App;


/**

firebase. 데이터 베이스 뿐아니라 서버 API기능까지 제공한다.
firebase. 일반적으로 사용자의 요청이 있을 때 웹서버에서 받고 데이터 베이스 연동하여 저장
firebase. 웹서버 + 데이터베이스 통합
firebase. 온전히 서버 전체 기능을 제공할 수 있다.


firebase. hosting. 프로젝트 배포
firebase. hosting. 

react. build. yarn add --dev copy-webpack-plugin
react. build. webpack.config.js > plugin 추가
react. build. yarn add firebase-tools

*/