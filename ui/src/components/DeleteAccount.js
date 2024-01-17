import React from 'react'

function DeleteAccount() {
  return (
    <div>
        <div>
            Delete Account
        </div>
        <div>
            Would you like to delete Account ?
        </div>
        <div>
            This account contains your order history. Deleting your account is permanent
            and will remove all the contain associated with it. 
        </div>
        <button type='button' onClick={handleDeleteAccount}>
            I want to delete my account
        </button>
    </div>
  )
}

export default DeleteAccount
