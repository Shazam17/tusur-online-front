import React, {Component} from "react";
import fetchRequest from "./fetchRequest";
import {MAIN_STYLES} from "../../constants";
const kit = "https://wuzzup.ru/wp-content/uploads/2019/05/43054392_2250627378549261_137207783997206054_n.jpg"
import Modal from 'react-modal';
import ImageViewer from 'react-simple-image-viewer';


export function Post(props) {

    const {post} = props;

    return (<div style={{...MAIN_STYLES.highlightedText,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '90%',
        padding: '1em',
        paddingTop: '0em'
        }}>
        <div style={{  display: 'flex', alignItems: 'center'}}><img style={{width: '2em', height: '2em', borderRadius: '1em', marginRight: '1em'}} src={kit}/><p style={{fontSize: '2em'}}>{post.title}</p></div>
        <div style={{textAlign:'left', width: '100%', textOverflow: 'ellipsis',wordBreak: 'break-all' }}>{post.content}</div>
    </div>)
}


export default class ProfilePage extends Component {

    state = {
        posts: [],
        stories: [],
        isOpen: false,
        title: "",
        content: "",
        imageViewerState: false,
        storyIndex: null,
        renderAllStories: 3,
        userInfo: null
    }

    componentDidMount(){
            const user =  sessionStorage.getItem('userId');
            fetchRequest(`posts/posts-get?id=${user}`,'GET').then((res) => {
                console.log(res.data)
                this.setState({...this.state,posts: res.data, isOpen: false});
            })
        fetchRequest(`stories/get?id=${user}`,'GET').then((res) => {
            console.log(res.data)
            this.setStories(res.data)
        })

        fetchRequest(`admin/user?id=${user}`,'GET').then((res) => {
            this.setState({...this.state,userInfo: res.data})
        })


    }

    setTitle(ev){
        this.setState({...this.state, title: ev.target.value })
    }

    setContent(ev){
        this.setState({...this.state, content: ev.target.value})
    }

    setStories(data){
        this.setState({...this.state, stories:data})
    }

    setImageViewerState(val){
        this.setState({...this.state, imageViewerState:val})

    }

    setRenderStories(val){
        this.setState({...this.state,renderAllStories: val})
    }

    createPost(){
        const user =  sessionStorage.getItem('userId');
        fetchRequest("posts/create", 'POST', {title: this.state.title,content: this.state.content, id:user, isGroup: false })
            .then((res) => {
            console.log(res)
        })
        this.setState({...this.state, title: "", content: ""})
    }

    createStory(){
        const user =  sessionStorage.getItem('userId');
        let url = prompt("Введите ссылку на картинку");
        fetchRequest("stories/create", 'POST', {url, id:user })
            .then((res) => {
                console.log(res)
                this.setStories([...this.state.stories, res.data])
            })
    }

    renderStories(){
        return (<div style={{display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridColumnGap: '5px',
            gridRowGap: '5px'}}>
            <img
                style={{...MAIN_STYLES.story, backgroundColor: '#afafba'}}
                src={"iconfinder_plus_309084.svg"}
                onClick={() => {
                    this.createStory()
                }}/>
            {this.state.stories.slice(0,this.state.renderAllStories).map((item, index) => (<img onClick={() => {
                console.log('click')
                this.setState({...this.state, storyIndex:index,imageViewerState: true })
            }} style={MAIN_STYLES.story} src={item.photo}/>))}
        </div>)
    }

    render(){
        return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {this.state.imageViewerState ?
                <ImageViewer
                src={ this.state.stories.map(item => item.photo) }
                currentIndex={ this.state.storyIndex }
                onClose={ () => this.setImageViewerState(false) }
            /> : null }

            <Modal
                isOpen={this.state.isOpen}
                contentLabel="Создание поста"
                onRequestClose={() => this.setState({...this.state, isOpen: false})}
                style={{content: {
                        top: '25%',
                        bottom: '25%',
                        right: '25%',
                        left: '25%'
                    }}}
            >
                <div style={{backgroundColor: '#aaafff',
                    width: '90%',
                    height: '90%',
                    display:'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '1em'}}>
                    <input placeholder={"введите название"} style={MAIN_STYLES.textInput} type={"text"} onChange={this.setTitle.bind(this)}/>
                    <div style={{height: '20px'}}/>
                    <input placeholder={"введите контент"} style={{...MAIN_STYLES.textInput, width: '10em'}} type={"text"} onChange={this.setContent.bind(this)}/>
                    <input style={MAIN_STYLES.button} type={"button"} value={"создать"} onClick={() => {
                        this.createPost()
                    }}/>
                </div>
            </Modal>
        <div style={{
            ...MAIN_STYLES.offsetBlockRounded,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '1',
            alignSelf: 'flex-start'
        }}>
        <h2 style={MAIN_STYLES.text}>{this.state.userInfo?.email}</h2>
            <h2 style={MAIN_STYLES.text}>{this.state.userInfo?.first_name} {this.state.userInfo?.last_name}</h2>
        <img style={MAIN_STYLES.profileAvatar}
        src={this.state.userInfo?.avatar_url}/>
        <button style={MAIN_STYLES.button} onClick={() => {
            window.sessionStorage.clear();
            // history.push('/login');
        }}>выйти из профиля</button>
            <div style={{display:'flex', alignItems: 'center', flexDirection: 'column'}}>
                {this.renderStories()}
                <input
                    onClick={() => {
                        if(this.state.renderAllStories === 3){
                            this.setRenderStories(this.state.stories.length)
                        }else{
                            this.setRenderStories(3)
                        }
                    }}
                    style={{...MAIN_STYLES.button, marginBottom: '0px'}}
                    type={"button"}
                    value={this.state.renderAllStories === 3 ? "показать больше" : "скрыть все истории"}/>
            </div>
        </div>


        <div style={{
            ...MAIN_STYLES.offsetBlockRounded,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '3',
            marginRight: '2em',
            marginBottom: '2em'
        }}>
            <button style={MAIN_STYLES.button} onClick={() => {
                this.setState({...this.state, isOpen: true})
            }}>Создать пост</button>
            {this.state.posts.map(item => <Post post={item}/>)}
                    </div>
                </div>

            )
        }
}
