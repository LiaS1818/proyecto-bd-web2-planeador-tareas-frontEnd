import React from 'react';

const Perfil = () => {
  // Obtener los datos del usuario del localStorage
  const userInStorageString = window.localStorage.getItem('user');
  const userInStorage = JSON.parse(userInStorageString);

  // Definir un objeto de contacto temporal para demostración
  const contact = {
    first: userInStorage.user.name || '',
    last: '',
    avatar: 'https://robohash.org/you.png?size=200x200',
    twitter: userInStorage.user.twitter || '',
    notes: 'Some notes',
    favorite: true,
  };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar}
          alt="Avatar"
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <form action="edit">
            <button type="submit">Edit</button>
          </form>
          <form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  'Please confirm you want to delete this record.'
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
};

function Favorite({ contact }) {
  const favorite = contact.favorite;
  return (
    <form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </form>
  );
}

export default Perfil;
