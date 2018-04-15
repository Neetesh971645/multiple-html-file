import './css/main.css';
import './scss/main.scss';

import {sup} from './js/module';	//to export JS file, you don't need to JS extension.
import {hello} from './js/hello';	//to export JS file, you don't need to JS extension.

sup();
hello();

console.log('Webpack Index JS is working!!');



