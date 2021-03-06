import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('selector/submit-design-modal', 'Integration | Component | selector/submit design modal', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{selector/submit-design-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#selector/submit-design-modal}}
      template block text
    {{/selector/submit-design-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
