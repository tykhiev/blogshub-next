<script setup>
import io from 'socket.io-client'
import onBeforeMount from 'vue';

const socket = io('http://localhost:5000')

const messages = ref([])
const messageText = ref('')
const joined = ref(false)
const name = ref('')
const typingDisplay = ref('')

onBeforeMount(() => {
    socket.emit('findAllMessages', {}, (response) => {
      messages.value = response;  
    });

    socket.on('message', (message) => {
    messages.value.push(message)
    });
});

const sendMessage = () => {
  socket.emit(createMessage), {text: messageText.value}, () => {
    messageText.value = '';
  };
};

const join = () => {
  socket.emit('join', {name: name.value}, () => {
    joined.value = true;
});
};

const emitTyping = () => {
  socket.emit('typing', { isTyping: true })

  timeout = setTimeout(() => {
    socket.emit('typing', { isTyping: false })
  }, 2000)
}

return (
  <div class="chat"> 
    <div class="chat-container">
      <div class="messages-container">
        <div v-for="messages" in messages>
        [{{message.name}}]: {{message.text}}
        </div>
        </div>
      </div>
    </div>
);


</script>