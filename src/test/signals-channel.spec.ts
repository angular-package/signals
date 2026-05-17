import { SignalsChannel } from '../lib/signals-channel.class';

let signalsChannel = new SignalsChannel({
  'firstName': 'Mark',
  'age': 27
  }, {
    emitter: {
      key: 'key' as string,
      value: 'value' as string
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
  it(`should emit on set`, async () => {
    await new Promise<void>(resolve => {
      signalsChannel.$onSet.subscribe(payload => {
        expect(payload).toEqual({
          key: 'age',
          value: 37
        });
      });
      signalsChannel.set('age', 37);
      resolve();
    });
  });
  it(`should emit on set with custom configuration`, async () => {
    await new Promise<void>(resolve => {
      signalsChannel.configure({
        emitter: {
          key: 'customKey',
          value: 'customValue'
        }
      });
      signalsChannel.$onSet.subscribe(payload => {
        expect(payload).toEqual({
          customKey: 'age',
          customValue: 37
        });
      });
      signalsChannel.set('age', 37);
      resolve();
    });
  });
  it(`should emit on set with custom configuration and custom emitter keys`, async () => {
    await new Promise<void>(resolve => {
      signalsChannel.configure({
        emitter: {
          key: 'customKey',
          value: 'customValue'
        }
      });
      signalsChannel.$onSet.subscribe(payload => {
        expect(payload).toEqual({
          customKey: 'age',
          customValue: 37
        });
        resolve();
      });
      signalsChannel.set('age', 37);
    });
  });
});

