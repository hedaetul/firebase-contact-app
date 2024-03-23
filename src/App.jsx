import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAndUpdate from './components/AddAndUpdate';
import ContactCard from './components/ContactCard';
import Navbar from './components/Navbar';
import NotFoundContact from './components/NotFoundContact';
import { db } from './config/firebase';
import useDisclouse from './hooks/useDisclouse';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactRef = collection(db, 'contacts');

    onSnapshot(contactRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className=' px-4 mx-auto max-w-[370px]'>
        <Navbar />
        <div className='flex gap-2'>
          <div className='flex flex-grow relative items-center'>
            <FiSearch className=' mx-1 absolute text-3xl text-white ' />
            <input
              onChange={filterContacts}
              type='text'
              className=' text-white px-9 flex-grow h-10 rounded-md border border-white bg-transparent'
            />
          </div>
          <div>
            <AiFillPlusCircle
              onClick={onOpen}
              className='text-5xl text-white cursor-pointer'
            />
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-3'>
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdate onClose={onClose} isOpen={isOpen} />
      <ToastContainer />
    </>
  );
};
export default App;
