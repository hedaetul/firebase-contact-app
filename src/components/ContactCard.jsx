import { deleteDoc, doc } from 'firebase/firestore';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { db } from '../config/firebase';
import useDisclouse from '../hooks/useDisclouse';
import AddAndUpdate from './AddAndUpdate';

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse(false);

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, 'contacts', id));
      toast.success('Contact Deleted Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className='bg-yellow-200 flex justify-between items-center p-2 rounded-lg'
      >
        <div className='flex gap-1'>
          <HiOutlineUserCircle className='text-4xl text-orange-400' />
          <div className=''>
            <h2 className='font-medium'>{contact.name}</h2>
            <p className='text-sm'>{contact.email}</p>
          </div>
        </div>
        <div className='flex text-3xl'>
          <RiEditCircleLine
            onClick={onOpen}
            className='text-orange-500 cursor-pointer'
          />
          <IoMdTrash
            className='text-orange-500 cursor-pointer'
            onClick={() => deleteContact(contact.id)}
          />
        </div>
      </div>
      <AddAndUpdate
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
