import 'babel-polyfill';

export default function*() {
    let i = 0;
    yield 'start';
    while(true) {
        yield i;
        i++;
        yield 'end loop';
    }
}