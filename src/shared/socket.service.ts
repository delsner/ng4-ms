import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
    private url: String = 'http://localhost:4000';
    private socket;

    constructor() {
        this.connect();
    }

    connect() {
        this.socket = io(this.url);
        this.addSocketListener('news', (res) => {
            console.log('news', res);
            this.send('event2', { test: "test" });
        });
        this.addSocketListener('clicked', (res) => {
            console.log(res);
        })
    }

    send(event, data) {
        this.socket.emit(event, data);
    }

    disconnect() {
        this.socket.disconnect();
    }

    addSocketListener(event, callback) {
        this.socket.on(event, callback);
    }
}
