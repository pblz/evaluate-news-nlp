// __mocks__/postData.js
const validJSON = {
    'status': {
        'code': 0
    },
    'score_tag': 'P',
    'agreement': 'AGREEMENT',
    'subjectivity': 'OBJECTIVE',
    'irony': 'IRONIC'
};

function postData(url, data) {
    return new Promise((resolve, reject) => {
      process.nextTick(() =>
        url
          ? resolve(validJSON)
          : reject({
              error: 'Invalid Request',
            }),
      );
    });
  }

  module.exports = postData;