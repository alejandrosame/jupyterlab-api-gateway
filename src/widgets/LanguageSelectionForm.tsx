import { each } from '@lumino/algorithm';
import { Dialog } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { ILanguageSelection } from '../tokens';

/**
 * The UI for the languafe selection form
 */
export class LanguageSelectionForm extends Widget
  implements Dialog.IBodyWidget<ILanguageSelection> {
  constructor(
    textContent = 'Select programming language and variant for code generation',
    options: ILanguageSelection[] = [],
    selected: ILanguageSelection = null
  ) {
    super();
    this.node.appendChild(this.createBody(textContent, options, selected));
  }

  private createBody(
    textContent: string,
    options: ILanguageSelection[],
    selected: ILanguageSelection
  ): HTMLElement {
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
      option.value = `${optionValue.language} - ${optionValue.variant}`;
      option.textContent = `${optionValue.label} - ${optionValue.variant}`;
      if (optionValue === selected) {
        option.selected = true;
      }
      this._languageSelection.appendChild(option);
    });
    label.appendChild(text);
    node.appendChild(label);
    node.appendChild(this._languageSelection);
    return node;
  }

  /**
   * Returns the input value.
   */
  getValue(): ILanguageSelection {
    return {
      language: this._languageSelection.value.split(" - ")[0],
      label: this._languageSelection.textContent.split(" - ")[0],
      variant: this._languageSelection.value.split(" - ")[1]
    };
  }

  private _languageSelection: HTMLSelectElement;
}
