import {io} from "socket.io-client";


export default class SocketWrapper {


    constructor() {
        this.socket = io('http://localhost:3002');
        this.listnener = new Map();


    }

    addListener(type, callback){
        this.socket.on(type, callback)
        this.listnener.set(type, callback);
    }

    static Instance = null

    unsubscribe(){
        for(const [k, v] of this.listnener){
            this.socket.off(k)
        }
    }




    unsubscribeEvent(ev){
        this.socket.off(ev)
    }


    static GetInstance(){
        if(!SocketWrapper.Instance){
            SocketWrapper.Instance = new SocketWrapper()
        }

        return SocketWrapper.Instance
    }

    static GetSocket(){
        if(!SocketWrapper.Instance){
            SocketWrapper.Instance = new SocketWrapper()
        }

        return SocketWrapper.Instance.socket
    }

}
