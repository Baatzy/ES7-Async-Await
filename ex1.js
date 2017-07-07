function hello() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello');
    }, 1000);
  })
}

function there() {
  return 'there';
}

function world() {
  return 'world';
}

function test() {
  const first = hello();
  const second = there();
  const third = world();

  console.log(first);
  console.log(second);
  console.log(third);
}

test();
