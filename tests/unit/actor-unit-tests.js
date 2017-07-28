const { assert } = require('chai');
const Actor = require('../../lib/models/actor-model');

describe('actor model', () => {

    it('validates with required fields', () => {
        const actor = new Actor ({
            name: 'Jackie Chan'
        });

        return actor.validate()
            .then(() => assert.ok(actor));

    });

    it('validation fails without required fields', () => {
        const actor = new Actor();

        return actor.validate()
            .then(
                () => { throw new Error('Expected validation error'); },
                ({ errors }) => {
                    assert.ok(errors.name);
                }
            );
    });

});