'use babel';

import SobatJpSlotView from './sobat-jp-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  sobatJpSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sobatJpSlotView = new SobatJpSlotView(state.sobatJpSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sobatJpSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sobat-jp-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sobatJpSlotView.destroy();
  },

  serialize() {
    return {
      sobatJpSlotViewState: this.sobatJpSlotView.serialize()
    };
  },

  toggle() {
    console.log('SobatJpSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
