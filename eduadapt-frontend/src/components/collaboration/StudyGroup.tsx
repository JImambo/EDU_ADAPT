// src/components/collaboration/StudyGroup.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: User[];
  sharedContent: ContentItem[];
  discussions: Discussion[];
}

export const StudyGroup: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  useEffect(() => {
    // Charger les informations du groupe
    fetch(`/api/study-groups/${groupId}`)
      .then(res => res.json())
      .then(data => setGroup(data))
      .catch(err => console.error(err));
  }, [groupId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !group) return;
    
    // Envoyer le message au groupe
    fetch(`/api/study-groups/${groupId}/discussions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: newMessage,
        userId: 'current-user-id' // À remplacer par l'ID de l'utilisateur connecté
      })
    })
    .then(res => res.json())
    .then(updatedGroup => setGroup(updatedGroup))
    .catch(err => console.error(err));
    
    setNewMessage('');
  };

  const handleShareContent = (contentId: string) => {
    if (!group) return;
    
    // Partager du contenu avec le groupe
    fetch(`/api/study-groups/${groupId}/share-content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contentId,
        userId: 'current-user-id' // À remplacer par l'ID de l'utilisateur connecté
      })
    })
    .then(res => res.json())
    .then(updatedGroup => setGroup(updatedGroup))
    .catch(err => console.error(err));
  };

  if (!group) return <div>Chargement...</div>;

  return (
    <div className="study-group">
      <h1>{group.name}</h1>
      <p>{group.description}</p>
      
      <div className="group-members">
        <h2>Membres ({group.members.length})</h2>
        <ul>
          {group.members.map(member => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      </div>
      
      <div className="shared-content">
        <h2>Contenu partagé</h2>
        {group.sharedContent.map(content => (
          <div key={content.id} className="content-item">
            <h3>{content.title}</h3>
            <p>{content.description}</p>
            <button onClick={() => handleShareContent(content.id)}>
              Partager avec mes groupes
            </button>
          </div>
        ))}
      </div>
      
      <div className="discussions">
        <h2>Discussions</h2>
        <div className="messages">
          {group.discussions.map(discussion => (
            <div key={discussion.id} className="message">
              <strong>{discussion.author}:</strong> {discussion.message}
              <span className="timestamp">{new Date(discussion.timestamp).toLocaleString()}</span>
            </div>
          ))}
        </div>
        
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrire un message..."
          />
          <button onClick={handleSendMessage}>Envoyer</button>
        </div>
      </div>
    </div>
  );
};