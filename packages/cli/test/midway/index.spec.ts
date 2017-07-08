//

import { join } from 'path';

import fixtureCasesExtract = require('fixture-cases-extract');

import { yargsParser } from 'src/parser';

//

const parser = yargsParser();

//

fixtureCasesExtract({
  basePath: join(__dirname, 'fixtures'),
  fileMap: {

  }
})
.forEach((testCase) => {
  test(testCase.name, () => {
    // given

    // when
    parser([]);

    // then
  });
});
