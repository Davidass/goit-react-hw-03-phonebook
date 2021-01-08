import { Component } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

const INIITAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = INIITAL_STATE;

  handleInputForm = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAdd } = this.props;

    const isValidatedForm = this.validateForm();

    if (!isValidatedForm) return;

    onAdd({ id: uuid(), name, number });

    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckContact } = this.props;
    if (!name || !number) {
      alert('Some filed is empty');
      return false;
    }
    return onCheckContact(name);
  };

  resetForm = () => this.setState(INIITAL_STATE);

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleFormSubmit}>
        <label>
          <input
            className={s.input}
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={this.handleInputForm}
          />
        </label>
        <label>
          <input
            className={s.input}
            type="tell"
            name="number"
            placeholder="Enter phone number"
            value={number}
            onChange={this.handleInputForm}
          />
        </label>

        <button className={s.button} type="submit">
          {' '}
          Add Contact{' '}
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onCheckContact: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ContactForm;
