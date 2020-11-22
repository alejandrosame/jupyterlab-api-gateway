import { each } from '@lumino/algorithm';
import { Dialog } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { IAPIKey, ILanguageSelection, ISettingsSelection } from '../tokens';

/**
 * The UI for the languafe selection form
 */
export class SettingsForm extends Widget
  implements Dialog.IBodyWidget<ISettingsSelection> {
  constructor(
    options: ILanguageSelection[] = [],
    selected: ILanguageSelection = null,
    key: IAPIKey
  ) {
    super();
    this.node.appendChild(this.createBody(options, selected, key));
  }

  private createBody(
    options: ILanguageSelection[],
    selected: ILanguageSelection,
    key: IAPIKey
  ): HTMLElement {
    const node = document.createElement('div');
    node.className = 'jp-RedirectForm';

    // Set language section
    const langDiv = document.createElement('div');
    const langLabel = document.createElement('label');
    const langText = document.createElement('span');
    langText.textContent = "Language:";
    this._languageSelection = document.createElement('select');

    // Set up dropdown options
    each(options, (optionValue) => {
      const option = document.createElement('option');
      option.value = `${optionValue.language} - ${optionValue.variant}`;
      option.textContent = `${optionValue.label} - ${optionValue.variant}`;
      if (optionValue.language === selected.language &&
          optionValue.variant === selected.variant
      ) {
        option.selected = true;
      }
      this._languageSelection.appendChild(option);
    });

    langLabel.appendChild(langText);
    langDiv.appendChild(langLabel);
    langDiv.appendChild(this._languageSelection);

    // Set API Key section
    const keyDiv = document.createElement('div');
    const keyLabel = document.createElement('label');
    const keyText = document.createElement('span');
    keyText.textContent = "API key:";
    this._keyInput = document.createElement('input');

    // Set up input value
    this._keyInput.value = key.value;
    this._keyInput.style.marginTop="0";

    keyLabel.appendChild(keyText);
    keyDiv.appendChild(keyLabel);
    keyDiv.appendChild(this._keyInput);

    // Set main divs
    node.appendChild(langDiv);
    node.appendChild(keyDiv);
    return node;
  }

  /**
   * Returns the input value.
   */
  getValue(): ISettingsSelection {
    const selectedIndex = this._languageSelection.selectedIndex;

    const languageSelection: ILanguageSelection = {
      language: this._languageSelection.value.split(" - ")[0],
      label: this._languageSelection.options[selectedIndex].text.split(" - ")[0],
      variant: this._languageSelection.value.split(" - ")[1]
    };

    const keySelection: IAPIKey = {
      value: this._keyInput.value
    };

    return {
      language: languageSelection,
      APIKey: keySelection
    };
  }

  private _languageSelection: HTMLSelectElement;
  private _keyInput: HTMLInputElement;
}
