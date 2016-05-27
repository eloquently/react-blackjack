import 'babel-polyfill';

export default function*() {
    let i = 0;
    while(true) {
        yield i;
        i++;
    }
}