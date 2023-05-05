import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getNotes, createNote, updateNote } from './requests';

const App = () => {
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueriesData('notes', notes.concat(newNote));
    },
    /*en el callback de onSuccess, el objeto queryClient primero lee 
    el estado existente de notes de la consulta y lo actualiza agregando 
    una nueva nota, que se obtiene como parámetro de la función de devolución de llamada.*/
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    console.log(content);
    newNoteMutation.mutate({ content, important: true })
  }

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    },
  });

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }

  const result = useQuery('notes', getNotes, {
    refetchOnWindowFocus: false
  });

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App