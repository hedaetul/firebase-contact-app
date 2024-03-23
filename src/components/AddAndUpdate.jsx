import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { db } from '../config/firebase';
import Modal from './Modal';

const contactValidation = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  email: Yup.string().email('Email is Required'),
});

const AddAndUpdate = ({ contact, isOpen, onClose, isUpdate }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, 'contacts');
      await addDoc(contactRef, contact);
      onClose();
      toast.success('Contact Added Successfully');
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success('Contact Updated Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: '',
                  email: '',
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='name'>Name</label>
              <Field name='name' className='h-10 border' />
              <div className='text-xs text-red-500'>
                <ErrorMessage name='name' />
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='email'>Email</label>
              <Field name='email' className='h-10 border' />
              <div className='text-xs text-red-500'>
                <ErrorMessage name='email' />
              </div>
            </div>
            <button className='self-end border bg-orange-500 px-3 py-1.5 rounded-md'>
              {isUpdate ? 'Update' : 'Add'} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdate;
