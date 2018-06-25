import { JSDOM } from 'jsdom'
import 'raf/polyfill';

const DOM = new JSDOM('<!doctype html><html><body></body></html>')
global.window = DOM.window
global.document = global.window.document
global.navigator = global.window.navigator
