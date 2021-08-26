import { retry, timeoutPromise } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { notasService as service } from './nota/service.js';
import { compose, debounceTime, partialize, takeUntil } from './utils/operators.js';
import { EventEmitter } from './utils/event-emitter.js';

const operations = compose(
    partialize(debounceTime, 500),
    partialize(takeUntil, 3)
);

const action = operations(() =>
    retry(3, 3000, () => timeoutPromise(1000, service.sumItems('2143')))
    .then(total => EventEmitter.emit('itensTotalizados', total))
    .catch(console.log)
);

document
.querySelector('#myButton')
.onclick = action;