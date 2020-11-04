import { each } from '@lumino/algorithm';
import { Dialog, Styling } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { ILanguageSelection } from '../tokens';

/**
 * The UI for the languafe selection form
 */
export class LanguageSelectionForm extends Widget
  implements Dialog.IBodyWidget<ILanguageSelection> {
  constructor(
    textContent = 'Select programming language and variant for code generation',
    options = ['Python - requests', 'Nodejs - request'],
    selected = 'Python - requests'
  ) {
    super();
    this.node.appendChild(this.createBody(textContent, options, selected));
  }

  private createBody(textContent: string, options: string[], selected: string): HTMLElement {
    const node = document.createElement('div');
    const label = document.createElement('label');
    const text = document.createElement('span');
    this._languageSelection = document.createElement('select');

    // Set up values
    node.className = 'jp-RedirectForm';
    text.textContent = textContent;

    // Set up dropdown options
    each(options, (optionValue) => {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionValue;
      if (optionValue === selected) {
        option.selected = true;
      }
      this._languageSelection.appendChild(option);
    });
    const selectNode = Styling.wrapSelect(this._languageSelection);
    label.appendChild(text);
    node.appendChild(label);
    node.appendChild(selectNode);
    return node;
  }

  /**
   * Returns the input value.
   */
  getValue(): ILanguageSelection {
    return {
      language: this._languageSelection.value.split(" - ")[0],
      variant: this._languageSelection.value.split(" - ")[1]
    };
  }

  private _languageSelection: HTMLSelectElement;
}
