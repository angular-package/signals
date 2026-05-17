import { SignalsChannel } from '../lib/signals-channel.class';

let signalsChannel = new SignalsChannel({
  'firstName': 'Mark',
  'age': 27
  }, {
    emitter: {
      key: 'key',
      value: 'value'
    }
  }
);

describe(() => {
  beforeEach(() => {
    signalsChannel = new SignalsChannel({
      'firstName': 'Mark',
      'age': 27
      }, {
        emitter: {
          key: 'key',
          value: 'value'
        }
      }
    );
  });
  it(`should emit on set`, (done) => {
    signalsChannel.$onSet.subscribe(payload => {
      expect(payload).toEqual({
        key: 'age',
        value: 37
      });
      // done();
    });
    signalsChannel.set('age', 37);
  });
  it(`should emit on set with custom configuration`, (done) => {
    // signalsChannel.configure({
    //   emitter: {
    //     key: 'customKey',
    //     value: 'customValue'
    //   }
    // });
    // signalsChannel.$onSet.subscribe(payload => {
    //   expect(payload).toEqual({
    //     customKey: 'age',
    //     customValue: 37
    //   });
    //   done();
    // });
    // signalsChannel.set('age', 37);
  });
  it(`should emit on set with custom configuration and custom emitter keys`, (done) => {
    // signalsChannel.configure({
    //   emitter: {
    //     key: 'customKey',
    //     value: 'customValue'
    //   }
    // });
    // signalsChannel.$onSet.subscribe(payload => {
    //   expect(payload).toEqual({
    //     customKey: 'age',
    //     customValue: 37
    //   });
    //   done();
    // });
    // signalsChannel.set('age', 37);
  });
});

