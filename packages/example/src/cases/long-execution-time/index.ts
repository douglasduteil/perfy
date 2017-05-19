
document.addEventListener('DOMContentLoaded', function launchLongExecution() {
  const route = new URL(location.href);
  const searchParams: URLSearchParams = (route as any).searchParams;

  const duration = parseInt(searchParams.get('duration') || '', 10) || 1000;
  const interval = parseInt(searchParams.get('interval') || '', 10) || 1000;

  const waitFn = wait.bind(null, document.querySelector('#root'), duration);

  longExecutionTime(waitFn, interval);
});

//

function longExecutionTime(execFn: () => void, interval: number) {
  const loopingFn = () => longExecutionTime(execFn, interval);

  // first exection
  execFn();

  // next execution
  setTimeout(loopingFn, interval);
}

function wait(rootEl: HTMLElement, duration: number) {
  const start = performance.now();

  while ((performance.now() - start) <= duration) {
    // just wait...
  }

  rootEl.innerText += '.';
}
