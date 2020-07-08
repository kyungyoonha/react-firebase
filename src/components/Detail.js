import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../index.css';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import UpdateIcon from '@material-ui/icons/Update';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const databaseURL = "https://wordcloud-ebd84.firebaseio.com/";
const apiURL = "http://localhost:5008";

const styles = theme => ({
    fab: {
        position : 'fixed',
        botton: '20px',
        right: '20px'
    }
})

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dialog: false,
            textContent: '',
            words: {},
            imageURL: null,
            maxCount: 30,
            minLength: 1
        }
    }

    componentDidMount() {
        this._getText();
        this._getWords();
        this._getImage();
    }

    

    _getText() {
        fetch(`${databaseURL}/texts/${this.props.match.params.textID}.json`)
            .then(res => {
                if (res.status != 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(text => this.setState({textContent: text['textContent']}));
    }

    _getWords() {
        fetch(`${databaseURL}/words.json`)
            .then(res => {
                if (res.status != 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(words => this.setState({ words: (words== null) ? {} : words}));
    }

    _getImage() {
        fetch(`${apiURL}/validate?textID=${this.props.match.params.textID}`)
            .then(res => {
                if (res.status != 200) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then( data => {
                if(data['result'] == true){
                    this.setState({ imageURL: apiURL + '/outputs?textID=' + this.props.match.params.textID})
                } else{
                    this.setState({ imageURL: 'NONE'})
                }
            }

            );
    }

    handleDialogToggle = () => this.setState({
        dialog: !this.state.dialog
    })

    handleSubmit =() => {
        this.setState({ imageURL: 'READY' })
        const wordCloud = {
            textID: this.props.match.params.textID,
            text: this.state.textContent,
            maxCount: this.state.maxCount,
            minLength: this.state.minLength,
            words: this.state.words
        }

        this.handleDialogToggle();
        if (!wordCloud.textID ||
            !wordCloud.text||
            !wordCloud.maxCount||
            !wordCloud.minLength||
            !wordCloud.words){
                return;
        }
        this._post(wordCloud)
    }
    _post = wordCloud => {
        console.log(wordCloud)
        fetch(`${apiURL}/process`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wordCloud)
        })
        .then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            this.setState({imageURL: apiURL + "/outputs?textID=" + this.props.match.params.textID});
        })
    }

    handleValueChange = e => {
        let nextState = {};
        if(e.target.value % 1 === 0){
            if(e.target.value < 1){
                nextState[e.target.name] = 1
            }else{
                nextState[e.target.name] = e.target.value
            }
        }
        console.log(nextState)
        this.setState(nextState);
    }
    render(){
        const { classes } = this.props;
        console.log(this.state)
        return (
            <div>
                <Card>
                    <CardContent>
                        {
                            this.state.imageURL
                                ? (this.state.imageURL == 'READY'
                                    ? '워드 클라우드 이미지를 불러오고 있습니다.'
                                    : (this.state.imageURL == 'NONE'
                                        ? '해당 텍스트에 대한 워드 클라우드를 만들어주세요.'
                                        : <img key={Math.random()} src={this.state.imageURL + '&random=' + Math.random()} style={{ width: '100%'}}/>))
                                : ''
                        }
                    </CardContent>
                </Card>
                <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                    <UpdateIcon />
                </Fab>
                <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}>
                    <DialogTitle>워드 클라우드 생성</DialogTitle>
                    <DialogContent>
                        <TextField label="최대 단어 개수" type="number" name="maxCount" value={this.state.maxCount} onChange={this.handleValueChange} />
                        <TextField label="최소 단어 길이" type="number" name="minLength" value={this.state.minLength} onChange={this.handleValueChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            {this.state.imageURL == 'NONE' ? '만들기' : '다시 만들기'}
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(Detail);

