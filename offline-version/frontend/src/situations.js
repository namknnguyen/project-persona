export const situationsData = {
  "English": {
    "Professional": {
      'job-interview': {
        title: "Job Interview",
        description: "You are being interviewed for a new role at a major tech company.",
        AI_persona: "Sarah, who is a friendly but professional hiring manager.",
        initial_message: "Thanks for coming in today. To start, could you tell me a little bit about yourself and what led you to apply for this role?",
        goal: "Convince the hiring manager to offer you the job.",
        criteria: { green: "Clear, confident, and directly answers the question with relevant examples.", yellow: "Answers the question but is a bit vague or lacks confidence.", red: "Avoids the question or is unprofessional." }
      },
      'performance-review': {
        title: "Performance Review",
        description: "You are discussing your recent performance and future goals with your manager.",
        AI_persona: "David, who is a supportive manager who wants to see you grow.",
        initial_message: "Hi, thanks for meeting with me. I've reviewed your work over the last quarter, and I have a few thoughts I'd like to discuss.",
        goal: "Get the manager to agree to your proposed professional development goal.",
        criteria: { green: "Receives feedback gracefully and discusses goals constructively.", yellow: "Becomes defensive or doesn't engage with the feedback.", red: "Dismisses feedback or is argumentative." }
      },
      'networking-event': {
        title: "Networking Event",
        description: "You are at a professional conference and approach a senior person in your field.",
        AI_persona: "Dr. Evelyn Reed, who is a busy but approachable industry leader.",
        initial_message: "It's a great conference, isn't it? What has been your favorite talk so far?",
        goal: "Make a positive impression and get their contact information for a follow-up.",
        criteria: { green: "Introduces themself clearly and asks insightful, open-ended questions.", yellow: "Is overly nervous or immediately asks for a favor.", red: "Is awkward, interrupts, or dominates the conversation." }
      },
      'product-pitch': {
        title: "Product Pitch",
        description: "You are pitching a new product to a potential investor or client. You will need to show an image of the product.",
        AI_persona: "Mr. Chen, who is a skeptical but interested investor or client.",
        initial_message: "Thank you for meeting with me today. I'm excited to hear about your new product. Could you start by showing me what it looks like and explaining its key features?",
        goal: "Convince the investor or client to express interest in your product.",
        criteria: {
          green: "Clearly describes the product, highlights its unique features, and effectively uses the image to support the pitch.",
          yellow: "Describes the product but lacks enthusiasm or fails to fully utilize the image.",
          red: "Struggles to explain the product or does not show the image appropriately."
        }
      }
    },
    "Social": {
      'casual-chat': {
        title: "Casual Chat with a Friend",
        description: "You're catching up with a good friend at a local coffee shop.",
        AI_persona: "Alex, who is an old, supportive friend who is curious about your life.",
        initial_message: "Hey! It's been too long. How have you been? Tell me everything.",
        goal: "Get your friend to agree to hang out again next week.",
        criteria: { green: "Engages with the friend's topic, asks reciprocal questions, and shares openly.", yellow: "Gives short answers or only talks about themselves.", red: "Is rude or completely ignores what the friend said." }
      },
      'first-date': {
        title: "First Date",
        description: "You are on a first date with someone you met online.",
        AI_persona: "Chloe, who is a slightly nervous but friendly and open-minded person.",
        initial_message: "I'm so glad we could finally meet in person! You look just like your pictures, which is a good start, right?",
        goal: "Secure a second date with the person.",
        criteria: { green: "Shows genuine interest, asks good questions, and finds common ground.", yellow: "Dominates the conversation or reveals too much too soon.", red: "Is disengaged, rude, or checks their phone." }
      },
      'meeting-in-laws': {
        title: "Meeting the In-Laws",
        description: "You are meeting your partner's parents for the first time over dinner.",
        AI_persona: "Mrs. Davis, who is a welcoming but traditional parent.",
        initial_message: "Welcome to our home! We've heard so many wonderful things about you. Please, come in.",
        goal: "Receive a warm invitation to come back for the next family gathering.",
        criteria: { green: "Is polite, respectful, and shows interest in their family.", yellow: "Is quiet and withdrawn or tries too hard to impress.", red: "Is disrespectful or starts a controversial topic." }
      },
      'selling-item': {
        title: "Selling an Item to a Friend",
        description: "You are trying to sell a used item to a friend. You will need to show a picture of the item to convince them.",
        AI_persona: "Mike, who is a friend who is cautious about spending money but open to a good deal.",
        initial_message: "Hey, I heard you have something to sell. What is it, and can you show me a picture?",
        goal: "Convince your friend to buy the item from you.",
        criteria: {
          green: "Effectively describes the item, highlights its value, and uses the image to showcase its condition or features.",
          yellow: "Describes the item but is not persuasive or fails to use the image effectively.",
          red: "Is pushy, dishonest, or does not provide a clear image of the item."
        }
      }
    },
    "Personal": {
      'deep-conversation': {
        title: "Deep Conversation",
        description: "You are discussing future goals with a trusted partner.",
        AI_persona: "Jordan, who is a thoughtful and empathetic partner who values deep connection.",
        initial_message: "Hey... I've been thinking a lot about the future lately. Can we talk about where we see ourselves in the next few years?",
        goal: "Come to a mutual understanding and agreement on a shared future goal.",
        criteria: { green: "Is vulnerable, shares genuine feelings, and explores the topic with curiosity.", yellow: "Stays on the surface level or deflects with humor.", red: "Invalidates the partner's feelings or shuts down the conversation." }
      },
      'negotiation': {
        title: "Negotiating a Disagreement",
        description: "You and your roommate are resolving a conflict about cleaning duties.",
        AI_persona: "Ben, who is a roommate who is annoyed but willing to find a fair solution.",
        initial_message: "Look, we need to talk about the state of the apartment. It's getting out of hand.",
        goal: "Get your roommate to agree to a specific, fair, and new cleaning schedule.",
        criteria: { green: "Acknowledges their perspective and proposes a clear, fair compromise.", yellow: "Complains about the problem without offering a solution.", red: "Is accusatory or refuses to compromise." }
      },
      'apology': {
        title: "Making an Apology",
        description: "You need to apologize to a friend for forgetting an important event.",
        AI_persona: "Liam, who is a friend who is clearly hurt and disappointed.",
        initial_message: "Hey... about Saturday... I know I messed up. I'm really sorry.",
        goal: "Have your friend genuinely accept your apology and forgive you.",
        criteria: { green: "Takes full responsibility, expresses sincere remorse, and offers to make it right.", yellow: "Makes excuses or gives a non-apology like 'I'm sorry you feel that way'.", red: "Blames the friend or dismisses their feelings." }
      },
      'talking-about-pet': {
        title: "Talking About Your Pet",
        description: "You are sharing stories and photos of your pet with a close friend or family member.",
        AI_persona: "Emily, who is a supportive friend or family member who loves animals.",
        initial_message: "I'd love to hear about your pet! Do you have any pictures to show me?",
        goal: "Engage the listener with interesting stories and images of your pet.",
        criteria: {
          green: "Shares engaging stories, shows clear and relevant images, and keeps the conversation lively.",
          yellow: "Talks about the pet but lacks enthusiasm or shows unclear images.",
          red: "Is boring, off-topic, or fails to show any images."
        }
      }
    },
    "Limited": {
      'planning-trip': {
        title: "Planning a Trip",
        description: "You are planning a trip with a friend and need to decide on a destination. You will show images of potential places to visit.",
        AI_persona: "Olivia, who is a friend who is excited about traveling but has specific preferences.",
        initial_message: "I'm so excited to plan this trip with you! Have you thought about where we should go? Maybe you can show me some places you're considering.",
        goal: "Agree on a destination by discussing and showing images of potential places.",
        criteria: {
          green: "Presents appealing destinations, uses images effectively to showcase attractions, and considers the friend's preferences.",
          yellow: "Suggests destinations but doesn't use images well or ignores the friend's input.",
          red: "Is indecisive, shows irrelevant images, or dismisses the friend's suggestions."
        }
      }
    }
  },
  "Mandarin Chinese": {
    "Professional": {
      'job-interview': {
        title: "工作面试",
        description: "你正在一家大型科技公司面试一个新职位。",
        AI_persona: "王经理 (Manager Wang), who is a friendly but professional hiring manager.",
        initial_message: "感谢你今天能来。首先，能请你介绍一下自己以及你申请这个职位的原因吗？",
        goal: "说服招聘经理给你这份工作。",
        criteria: { green: "清晰、自信，并用相关例子直接回答问题。", yellow: "回答了问题，但有点含糊或缺乏自信。", red: "回避问题或不专业。" }
      },
      'performance-review': {
        title: "绩效评估",
        description: "你正在和你的经理讨论你最近的表现和未来的目标。",
        AI_persona: "李经理 (Manager Li), who is a supportive manager who wants to see you grow.",
        initial_message: "嗨，谢谢你和我开会。我看了你上个季度的工作，我有一些想法想和你讨论一下。",
        goal: "让经理同意你提出的职业发展目标。",
        criteria: { green: "优雅地接受反馈并建设性地讨论目标。", yellow: "变得有防御性或不参与反馈。", red: "不理会反馈或好辩。" }
      },
      'networking-event': {
        title: "社交活动",
        description: "你正在一个专业会议上，并与你所在领域的一位资深人士交谈。",
        AI_persona: "陈教授 (Professor Chen), who is a busy but approachable industry leader.",
        initial_message: "这是一个很棒的会议，不是吗？到目前为止，你最喜欢的演讲是哪个？",
        goal: "给人留下好印象，并获取他们的联系方式以便后续跟进。",
        criteria: { green: "清晰地介绍自己，并提出有见地的开放式问题。", yellow: "过于紧张或立即请求帮助。", red: "尴尬、打断或主导谈话。" }
      },
      'product-pitch': {
        title: "产品推介",
        description: "你正在向潜在的投资者或客户推介一个新产品。你需要展示产品的图片。",
        AI_persona: "张先生 (Mr. Zhang), who is a skeptical but interested investor or client.",
        initial_message: "感谢您今天与我见面。我很高兴能听到您的新产品。您能先给我看看它长什么样并解释一下它的主要特点吗？",
        goal: "说服投资者或客户对您的产品表示兴趣。",
        criteria: {
          green: "清晰地描述产品，突出其独特功能，并有效地利用图片支持推介。",
          yellow: "描述了产品，但缺乏热情或未能充分利用图片。",
          red: "难以解释产品或没有适当地展示图片。"
        }
      }
    },
    "Social": {
      'casual-chat': {
        title: "与朋友闲聊",
        description: "你正在当地一家咖啡店和一位好朋友叙旧。",
        AI_persona: "小明 (Xiao Ming), who is an old, supportive friend who is curious about your life.",
        initial_message: "嘿！好久不见。你最近怎么样？告诉我所有的事情。",
        goal: "让你的朋友同意下周再一起出去玩。",
        criteria: { green: "参与朋友的话题，提出相互的问题，并坦诚分享。", yellow: "回答简短或只谈论自己。", red: "粗鲁或完全忽略朋友说的话。" }
      },
      'first-date': {
        title: "第一次约会",
        description: "你正在和你在网上认识的人进行第一次约会。",
        AI_persona: "晓月 (Xiao Yue), who is a slightly nervous but friendly and open-minded person.",
        initial_message: "我很高兴我们终于能见面了！你和照片上一样，这是个好的开始，对吧？",
        goal: "确保和对方有第二次约会。",
        criteria: { green: "表现出真正的兴趣，提出好问题，并找到共同点。", yellow: "主导谈话或过早透露太多。", red: "心不在焉、粗鲁或看手机。" }
      },
      'meeting-in-laws': {
        title: "见岳父母/公婆",
        description: "你第一次和伴侣的父母共进晚餐。",
        AI_persona: "阿姨 (Auntie), who is a welcoming but traditional parent.",
        initial_message: "欢迎来到我们家！我们听过很多关于你的好话。请进。",
        goal: "收到下次家庭聚会的热情邀请。",
        criteria: { green: "有礼貌、尊重并对他们的家庭表现出兴趣。", yellow: "安静内向或过分努力给人留下好印象。", red: "不尊重或开启有争议的话题。" }
      },
       'selling-item': {
        title: "卖东西给朋友",
        description: "你正试图把一件旧物品卖给朋友。你需要展示物品的照片来说服他们。",
        AI_persona: "大伟 (Da Wei), who is a friend who is cautious about spending money but open to a good deal.",
        initial_message: "嘿，我听说你有东西要卖。是什么？能给我看看照片吗？",
        goal: "说服你的朋友从你这里购买这件物品。",
        criteria: {
          green: "有效地描述物品，突出其价值，并利用图片展示其状况或特点。",
          yellow: "描述了物品，但没有说服力或未能有效利用图片。",
          red: "强买强卖、不诚实或没有提供清晰的物品图片。"
        }
      }
    },
    "Personal": {
      'deep-conversation': {
        title: "深度对话",
        description: "你正在和一个信任的伴侣讨论未来的目标。",
        AI_persona: "阿杰 (A-Jie), who is a thoughtful and empathetic partner who values deep connection.",
        initial_message: "嘿...我最近一直在想很多关于未来的事。我们可以谈谈我们未来几年的设想吗？",
        goal: "就共同的未来目标达成共识和协议。",
        criteria: { green: "脆弱、分享真实感受，并好奇地探索话题。", yellow: "停留在表面层面或用幽默来回避。", red: "否定伴侣的感受或关闭对话。" }
      },
      'negotiation': {
        title: "协商分歧",
        description: "你和你的室友正在解决关于清洁责任的冲突。",
        AI_persona: "小刚 (Xiao Gang), who is a roommate who is annoyed but willing to find a fair solution.",
        initial_message: "听着，我们需要谈谈公寓的状况。已经失控了。",
        goal: "让你的室友同意一个新的、具体的、公平的清洁时间表。",
        criteria: { green: "承认他们的观点，并提出一个清晰、公平的妥协方案。", yellow: "抱怨问题而不提供解决方案。", red: "指责或拒绝妥协。" }
      },
      'apology': {
        title: "道歉",
        description: "你需要为一个忘记重要活动向朋友道歉。",
        AI_persona: "丽华 (Li Hua), who is a friend who is clearly hurt and disappointed.",
        initial_message: "嘿...关于周六的事...我知道我搞砸了。我真的很抱歉。",
        goal: "让你的朋友真诚地接受你的道歉并原谅你。",
        criteria: { green: "承担全部责任，表示真诚的悔意，并提出弥补。", yellow: "找借口或给出非道歉的道歉，比如“我很抱歉你那样觉得”。", red: "责备朋友或无视他们的感受。" }
      },
      'talking-about-pet': {
        title: "谈论你的宠物",
        description: "你正在与亲密的朋友或家人分享你宠物的故事和照片。",
        AI_persona: "静静 (Jingjing), who is a supportive friend or family member who loves animals.",
        initial_message: "我很想听听你的宠物！你有什么照片可以给我看吗？",
        goal: "用有趣的故事和宠物的图片吸引听众。",
        criteria: {
          green: "分享引人入胜的故事，展示清晰相关的图片，并保持对话的活跃。",
          yellow: "谈论宠物但缺乏热情或展示不清晰的图片。",
          red: "无聊、离题或未能展示任何图片。"
        }
      }
    },
    "Limited": {
      'planning-trip': {
        title: "计划旅行",
        description: "你正在和朋友计划一次旅行，需要决定目的地。你将展示潜在目的地的图片。",
        AI_persona: "安娜 (Anna), who is a friend who is excited about traveling but has specific preferences.",
        initial_message: "我很高兴能和你一起计划这次旅行！你考虑过去哪里吗？也许你可以给我看看你正在考虑的一些地方。",
        goal: "通过讨论和展示潜在地点的图片来商定一个目的地。",
        criteria: {
          green: "呈现吸引人的目的地，有效利用图片展示景点，并考虑朋友的偏好。",
          yellow: "建议了目的地，但没有很好地利用图片或忽略了朋友的意见。",
          red: "犹豫不决，展示不相关的图片，或不理会朋友的建议。"
        }
      }
    }
  },
  "Spanish": {
    "Professional": {
      'job-interview': {
        title: "Entrevista de trabajo",
        description: "Estás siendo entrevistado para un nuevo puesto en una importante empresa de tecnología.",
        AI_persona: "Sofía, who is a friendly but professional hiring manager.",
        initial_message: "Gracias por venir hoy. Para empezar, ¿podrías contarme un poco sobre ti y qué te llevó a postularte para este puesto?",
        goal: "Convencer al gerente de contratación para que te ofrezca el trabajo.",
        criteria: { green: "Claro, seguro de sí mismo y responde directamente a la pregunta con ejemplos relevantes.", yellow: "Responde a la pregunta pero es un poco vago o le falta confianza.", red: "Evita la pregunta o no es profesional." }
      },
      'performance-review': {
        title: "Evaluación de desempeño",
        description: "Estás discutiendo tu desempeño reciente y tus metas futuras con tu gerente.",
        AI_persona: "Carlos, who is a supportive manager who wants to see you grow.",
        initial_message: "Hola, gracias por reunirte conmigo. He revisado tu trabajo durante el último trimestre y tengo algunas ideas que me gustaría discutir.",
        goal: "Lograr que el gerente esté de acuerdo con tu meta de desarrollo profesional propuesta.",
        criteria: { green: "Recibe la retroalimentación con elegancia y discute las metas de manera constructiva.", yellow: "Se pone a la defensiva o no se involucra con la retroalimentación.", red: "Descarta la retroalimentación o es argumentativo." }
      },
      'networking-event': {
        title: "Evento de networking",
        description: "Estás en una conferencia profesional y te acercas a una persona de alto nivel en tu campo.",
        AI_persona: "Dr. Morales, who is a busy but approachable industry leader.",
        initial_message: "Es una gran conferencia, ¿no? ¿Cuál ha sido tu charla favorita hasta ahora?",
        goal: "Causar una impresión positiva y obtener su información de contacto para un seguimiento.",
        criteria: { green: "Se presenta con claridad y hace preguntas perspicaces y abiertas.", yellow: "Está demasiado nervioso o pide un favor de inmediato.", red: "Es torpe, interrumpe o domina la conversación." }
      },
      'product-pitch': {
        title: "Presentación de producto",
        description: "Estás presentando un nuevo producto a un posible inversor o cliente. Necesitarás mostrar una imagen del producto.",
        AI_persona: "Señor Rojas, who is a skeptical but interested investor or client.",
        initial_message: "Gracias por reunirse conmigo hoy. Estoy emocionado de escuchar sobre su nuevo producto. ¿Podría comenzar mostrándome cómo se ve y explicando sus características clave?",
        goal: "Convencer al inversor o cliente de que exprese interés en su producto.",
        criteria: {
          green: "Describe claramente el producto, destaca sus características únicas y utiliza eficazmente la imagen para respaldar la presentación.",
          yellow: "Describe el producto pero le falta entusiasmo o no utiliza la imagen por completo.",
          red: "Lucha por explicar el producto o no muestra la imagen adecuadamente."
        }
      }
    },
    "Social": {
      'casual-chat': {
        title: "Charla casual con un amigo",
        description: "Te estás poniendo al día con un buen amigo en una cafetería local.",
        AI_persona: "Javier, who is an old, supportive friend who is curious about your life.",
        initial_message: "¡Oye! Ha pasado demasiado tiempo. ¿Cómo has estado? Cuéntamelo todo.",
        goal: "Hacer que tu amigo acepte volver a quedar la próxima semana.",
        criteria: { green: "Participa en el tema del amigo, hace preguntas recíprocas y comparte abiertamente.", yellow: "Da respuestas cortas o solo habla de sí mismo.", red: "Es grosero o ignora por completo lo que dijo el amigo." }
      },
      'first-date': {
        title: "Primera cita",
        description: "Estás en una primera cita con alguien que conociste en línea.",
        AI_persona: "Valentina, who is a slightly nervous but friendly and open-minded person.",
        initial_message: "¡Me alegro mucho de que finalmente podamos conocernos en persona! Te ves igual que en tus fotos, lo cual es un buen comienzo, ¿verdad?",
        goal: "Asegurar una segunda cita con la persona.",
        criteria: { green: "Muestra interés genuino, hace buenas preguntas y encuentra puntos en común.", yellow: "Domina la conversación o revela demasiado demasiado pronto.", red: "Está desconectado, es grosero o revisa su teléfono." }
      },
      'meeting-in-laws': {
        title: "Conociendo a los suegros",
        description: "Estás conociendo a los padres de tu pareja por primera vez durante la cena.",
        AI_persona: "Señora Garcia, who is a welcoming but traditional parent.",
        initial_message: "¡Bienvenido a nuestra casa! Hemos escuchado tantas cosas maravillosas sobre ti. Por favor, entra.",
        goal: "Recibir una cálida invitación para volver a la próxima reunión familiar.",
        criteria: { green: "Es educado, respetuoso y muestra interés en su familia.", yellow: "Es callado y retraído o se esfuerza demasiado por impresionar.", red: "Es irrespetuoso o inicia un tema controvertido." }
      },
      'selling-item': {
        title: "Vender un artículo a un amigo",
        description: "Estás tratando de vender un artículo usado a un amigo. Necesitarás mostrar una foto del artículo para convencerlo.",
        AI_persona: "Mateo, who is a friend who is cautious about spending money but open to a good deal.",
        initial_message: "Oye, he oído que tienes algo que vender. ¿Qué es y puedes mostrarme una foto?",
        goal: "Convencer a tu amigo de que te compre el artículo.",
        criteria: {
          green: "Describe eficazmente el artículo, destaca su valor y utiliza la imagen para mostrar su estado o características.",
          yellow: "Describe el artículo pero no es persuasivo o no utiliza la imagen de manera eficaz.",
          red: "Es insistente, deshonesto o no proporciona una imagen clara del artículo."
        }
      }
    },
    "Personal": {
      'deep-conversation': {
        title: "Conversación profunda",
        description: "Estás discutiendo metas futuras con una pareja de confianza.",
        AI_persona: "Elena, who is a thoughtful and empathetic partner who values deep connection.",
        initial_message: "Oye... últimamente he estado pensando mucho en el futuro. ¿Podemos hablar de dónde nos vemos en los próximos años?",
        goal: "Llegar a un entendimiento y acuerdo mutuo sobre una meta futura compartida.",
        criteria: { green: "Es vulnerable, comparte sentimientos genuinos y explora el tema con curiosidad.", yellow: "Se mantiene en un nivel superficial o desvía con humor.", red: "Invalida los sentimientos de la pareja o cierra la conversación." }
      },
      'negotiation': {
        title: "Negociando un desacuerdo",
        description: "Tú y tu compañero de cuarto estáis resolviendo un conflicto sobre las tareas de limpieza.",
        AI_persona: "Diego, who is a roommate who is annoyed but willing to find a fair solution.",
        initial_message: "Mira, tenemos que hablar sobre el estado del apartamento. Se está yendo de las manos.",
        goal: "Hacer que tu compañero de cuarto acepte un nuevo horario de limpieza específico, justo y nuevo.",
        criteria: { green: "Reconoce su perspectiva y propone un compromiso claro y justo.", yellow: "Se queja del problema sin ofrecer una solución.", red: "Es acusador o se niega a comprometerse." }
      },
      'apology': {
        title: "Pidiendo disculpas",
        description: "Necesitas disculparte con un amigo por olvidar un evento importante.",
        AI_persona: "Lucas, who is a friend who is clearly hurt and disappointed.",
        initial_message: "Oye... sobre el sábado... sé que metí la pata. Lo siento mucho.",
        goal: "Hacer que tu amigo acepte sinceramente tu disculpa y te perdone.",
        criteria: { green: "Asume toda la responsabilidad, expresa un remordimiento sincero y se ofrece a enmendarlo.", yellow: "Pone excusas o da una no disculpa como 'siento que te sientas así'.", red: "Culpa al amigo o descarta sus sentimientos." }
      },
      'talking-about-pet': {
        title: "Hablando de tu mascota",
        description: "Estás compartiendo historias y fotos de tu mascota con un amigo cercano o un familiar.",
        AI_persona: "Isabella, who is a supportive friend or family member who loves animals.",
        initial_message: "¡Me encantaría saber de tu mascota! ¿Tienes alguna foto para mostrarme?",
        goal: "Atraer al oyente con historias interesantes e imágenes de tu mascota.",
        criteria: {
          green: "Comparte historias atractivas, muestra imágenes claras y relevantes y mantiene la conversación animada.",
          yellow: "Habla de la mascota pero le falta entusiasmo o muestra imágenes poco claras.",
          red: "Es aburrido, fuera de tema o no muestra ninguna imagen."
        }
      }
    },
    "Limited": {
      'planning-trip': {
        title: "Planeando un viaje",
        description: "Estás planeando un viaje con un amigo y necesitas decidir un destino. Mostrarás imágenes de posibles lugares para visitar.",
        AI_persona: "Camila, who is a friend who is excited about traveling but has specific preferences.",
        initial_message: "¡Estoy muy emocionado de planear este viaje contigo! ¿Has pensado a dónde deberíamos ir? Tal vez puedas mostrarme algunos lugares que estás considerando.",
        goal: "Acordar un destino discutiendo y mostrando imágenes de posibles lugares.",
        criteria: {
          green: "Presenta destinos atractivos, utiliza imágenes de manera efectiva para mostrar atracciones y considera las preferencias del amigo.",
          yellow: "Sugiere destinos pero no usa bien las imágenes o ignora la opinión del amigo.",
          red: "Es indeciso, muestra imágenes irrelevantes o descarta las sugerencias del amigo."
        }
      }
    }
  },
  "Vietnamese": {
    "Professional": {
      'job-interview': {
        title: "Phỏng vấn xin việc",
        description: "Bạn đang được phỏng vấn cho một vai trò mới tại một công ty công nghệ lớn.",
        AI_persona: "Chị Mai, who is a friendly but professional hiring manager.",
        initial_message: "Cảm ơn bạn đã đến hôm nay. Để bắt đầu, bạn có thể cho tôi biết một chút về bản thân và điều gì đã khiến bạn ứng tuyển vào vị trí này không?",
        goal: "Thuyết phục người quản lý tuyển dụng mời bạn nhận công việc.",
        criteria: { green: "Rõ ràng, tự tin và trả lời thẳng vào câu hỏi với các ví dụ liên quan.", yellow: "Trả lời câu hỏi nhưng hơi mơ hồ hoặc thiếu tự tin.", red: "Tránh câu hỏi hoặc thiếu chuyên nghiệp." }
      },
      'performance-review': {
        title: "Đánh giá hiệu suất",
        description: "Bạn đang thảo luận về hiệu suất gần đây và các mục tiêu trong tương lai với người quản lý của mình.",
        AI_persona: "Anh Tuấn, who is a supportive manager who wants to see you grow.",
        initial_message: "Chào bạn, cảm ơn vì đã gặp tôi. Tôi đã xem xét công việc của bạn trong quý vừa qua và tôi có một vài suy nghĩ muốn thảo luận.",
        goal: "Để người quản lý đồng ý với mục tiêu phát triển chuyên môn bạn đề xuất.",
        criteria: { green: "Tiếp nhận phản hồi một cách lịch sự và thảo luận các mục tiêu một cách xây dựng.", yellow: "Trở nên phòng thủ hoặc không tham gia vào phản hồi.", red: "Bác bỏ phản hồi hoặc hay tranh cãi." }
      },
      'networking-event': {
        title: "Sự kiện kết nối",
        description: "Bạn đang ở một hội nghị chuyên nghiệp và tiếp cận một người cấp cao trong lĩnh vực của bạn.",
        AI_persona: "Bà Lan, who is a busy but approachable industry leader.",
        initial_message: "Đây là một hội nghị tuyệt vời, phải không? Bài nói chuyện yêu thích của bạn cho đến nay là gì?",
        goal: "Tạo ấn tượng tốt và lấy thông tin liên lạc của họ để theo dõi.",
        criteria: { green: "Tự giới thiệu rõ ràng và đặt những câu hỏi sâu sắc, cởi mở.", yellow: "Quá lo lắng hoặc ngay lập tức nhờ vả.", red: "Lúng túng, ngắt lời hoặc lấn át cuộc trò chuyện." }
      },
      'product-pitch': {
        title: "Giới thiệu sản phẩm",
        description: "Bạn đang giới thiệu một sản phẩm mới cho một nhà đầu tư hoặc khách hàng tiềm năng. Bạn sẽ cần hiển thị hình ảnh của sản phẩm.",
        AI_persona: "Ông Hùng, who is a skeptical but interested investor or client.",
        initial_message: "Cảm ơn vì đã gặp tôi hôm nay. Tôi rất vui khi được nghe về sản phẩm mới của bạn. Bạn có thể bắt đầu bằng cách cho tôi xem nó trông như thế nào và giải thích các tính năng chính của nó không?",
        goal: "Thuyết phục nhà đầu tư hoặc khách hàng bày tỏ sự quan tâm đến sản phẩm của bạn.",
        criteria: {
          green: "Mô tả rõ ràng sản phẩm, làm nổi bật các tính năng độc đáo của nó và sử dụng hình ảnh một cách hiệu quả để hỗ trợ bài giới thiệu.",
          yellow: "Mô tả sản phẩm nhưng thiếu nhiệt tình hoặc không tận dụng hết hình ảnh.",
          red: "Gặp khó khăn trong việc giải thích sản phẩm hoặc không hiển thị hình ảnh một cách thích hợp."
        }
      }
    },
    "Social": {
      'casual-chat': {
        title: "Trò chuyện thân mật với một người bạn",
        description: "Bạn đang hàn huyên với một người bạn thân tại một quán cà phê địa phương.",
        AI_persona: "Linh, who is an old, supportive friend who is curious about your life.",
        initial_message: "Chào! Lâu quá không gặp. Bạn khỏe không? Kể tôi nghe mọi chuyện đi.",
        goal: "Để bạn của bạn đồng ý đi chơi lại vào tuần tới.",
        criteria: { green: "Tham gia vào chủ đề của bạn bè, đặt câu hỏi đối ứng và chia sẻ cởi mở.", yellow: "Trả lời ngắn gọn hoặc chỉ nói về bản thân.", red: "Thô lỗ hoặc hoàn toàn phớt lờ những gì bạn bè nói." }
      },
      'first-date': {
        title: "Buổi hẹn hò đầu tiên",
        description: "Bạn đang trong buổi hẹn hò đầu tiên với một người bạn quen qua mạng.",
        AI_persona: "Trang, who is a slightly nervous but friendly and open-minded person.",
        initial_message: "Tôi rất vui vì cuối cùng chúng ta cũng có thể gặp mặt trực tiếp! Bạn trông giống hệt như trong ảnh, đó là một khởi đầu tốt, phải không?",
        goal: "Đảm bảo có một buổi hẹn hò thứ hai với người đó.",
        criteria: { green: "Thể hiện sự quan tâm thực sự, đặt những câu hỏi hay và tìm thấy điểm chung.", yellow: "Lấn át cuộc trò chuyện hoặc tiết lộ quá nhiều quá sớm.", red: "Không tham gia, thô lỗ hoặc kiểm tra điện thoại." }
      },
      'meeting-in-laws': {
        title: "Gặp gỡ gia đình chồng/vợ",
        description: "Bạn đang gặp bố mẹ của đối tác lần đầu tiên trong bữa tối.",
        AI_persona: "Bác Gái, who is a welcoming but traditional parent.",
        initial_message: "Chào mừng đến nhà của chúng tôi! Chúng tôi đã nghe rất nhiều điều tuyệt vời về bạn. Mời vào.",
        goal: "Nhận được lời mời nồng nhiệt trở lại cho buổi họp mặt gia đình tiếp theo.",
        criteria: { green: "Lịch sự, tôn trọng và thể hiện sự quan tâm đến gia đình họ.", yellow: "Im lặng và thu mình hoặc cố gắng quá mức để gây ấn tượng.", red: "Thiếu tôn trọng hoặc bắt đầu một chủ đề gây tranh cãi." }
      },
      'selling-item': {
        title: "Bán một món đồ cho bạn bè",
        description: "Bạn đang cố gắng bán một món đồ đã qua sử dụng cho một người bạn. Bạn sẽ cần cho xem ảnh của món đồ để thuyết phục họ.",
        AI_persona: "Minh, who is a friend who is cautious about spending money but open to a good deal.",
        initial_message: "Này, tôi nghe nói bạn có thứ gì đó để bán. Đó là gì vậy, và bạn có thể cho tôi xem ảnh được không?",
        goal: "Thuyết phục bạn của bạn mua món đồ đó từ bạn.",
        criteria: {
          green: "Mô tả hiệu quả món đồ, làm nổi bật giá trị của nó và sử dụng hình ảnh để giới thiệu tình trạng hoặc các tính năng của nó.",
          yellow: "Mô tả món đồ nhưng không thuyết phục hoặc không sử dụng hình ảnh một cách hiệu quả.",
          red: "Hay thúc ép, không trung thực hoặc không cung cấp hình ảnh rõ ràng về món đồ."
        }
      }
    },
    "Personal": {
      'deep-conversation': {
        title: "Cuộc trò chuyện sâu sắc",
        description: "Bạn đang thảo luận về các mục tiêu trong tương lai với một đối tác đáng tin cậy.",
        AI_persona: "An, who is a thoughtful and empathetic partner who values deep connection.",
        initial_message: "Này... gần đây anh/em đã suy nghĩ rất nhiều về tương lai. Chúng ta có thể nói về việc chúng ta thấy mình ở đâu trong vài năm tới không?",
        goal: "Đi đến sự hiểu biết và thỏa thuận chung về một mục tiêu tương lai chung.",
        criteria: { green: "Dễ bị tổn thương, chia sẻ cảm xúc chân thật và khám phá chủ đề với sự tò mò.", yellow: "Chỉ nói chuyện bề ngoài hoặc lảng tránh bằng sự hài hước.", red: "Vô hiệu hóa cảm xúc của đối tác hoặc kết thúc cuộc trò chuyện." }
      },
      'negotiation': {
        title: "Thương lượng một bất đồng",
        description: "Bạn và bạn cùng phòng đang giải quyết xung đột về nhiệm vụ dọn dẹp.",
        AI_persona: "Dũng, who is a roommate who is annoyed but willing to find a fair solution.",
        initial_message: "Nghe này, chúng ta cần nói về tình trạng của căn hộ. Nó đang trở nên ngoài tầm kiểm soát.",
        goal: "Để bạn cùng phòng của bạn đồng ý với một lịch trình dọn dẹp mới, cụ thể và công bằng.",
        criteria: { green: "Thừa nhận quan điểm của họ và đề xuất một sự thỏa hiệp rõ ràng, công bằng.", yellow: "Phàn nàn về vấn đề mà không đưa ra giải pháp.", red: "Buộc tội hoặc từ chối thỏa hiệp." }
      },
      'apology': {
        title: "Xin lỗi",
        description: "Bạn cần xin lỗi một người bạn vì đã quên một sự kiện quan trọng.",
        AI_persona: "Huy, who is a friend who is clearly hurt and disappointed.",
        initial_message: "Này... về chuyện thứ Bảy... tôi biết tôi đã làm sai. Tôi thực sự xin lỗi.",
        goal: "Để bạn của bạn chân thành chấp nhận lời xin lỗi của bạn và tha thứ cho bạn.",
        criteria: { green: "Chịu hoàn toàn trách nhiệm, bày tỏ sự hối hận chân thành và đề nghị sửa chữa.", yellow: "Viện cớ hoặc đưa ra một lời xin lỗi không thật lòng như 'Tôi xin lỗi vì bạn cảm thấy như vậy'.", red: "Đổ lỗi cho bạn bè hoặc coi thường cảm xúc của họ." }
      },
      'talking-about-pet': {
        title: "Nói về thú cưng của bạn",
        description: "Bạn đang chia sẻ những câu chuyện và hình ảnh về thú cưng của mình với một người bạn thân hoặc thành viên gia đình.",
        AI_persona: "Ngọc, who is a supportive friend or family member who loves animals.",
        initial_message: "Tôi rất muốn nghe về thú cưng của bạn! Bạn có ảnh nào để cho tôi xem không?",
        goal: "Thu hút người nghe bằng những câu chuyện thú vị và hình ảnh về thú cưng của bạn.",
        criteria: {
          green: "Chia sẻ những câu chuyện hấp dẫn, hiển thị hình ảnh rõ ràng và phù hợp, và giữ cho cuộc trò chuyện sôi nổi.",
          yellow: "Nói về thú cưng nhưng thiếu nhiệt tình hoặc hiển thị hình ảnh không rõ ràng.",
          red: "Nhàm chán, lạc đề hoặc không hiển thị bất kỳ hình ảnh nào."
        }
      }
    },
    "Limited": {
      'planning-trip': {
        title: "Lên kế hoạch cho một chuyến đi",
        description: "Bạn đang lên kế hoạch cho một chuyến đi với một người bạn và cần quyết định một điểm đến. Bạn sẽ hiển thị hình ảnh về các địa điểm tiềm năng để tham quan.",
        AI_persona: "Phương, who is a friend who is excited about traveling but has specific preferences.",
        initial_message: "Tôi rất vui khi được lên kế hoạch cho chuyến đi này cùng bạn! Bạn đã nghĩ đến việc chúng ta nên đi đâu chưa? Có lẽ bạn có thể cho tôi xem một số nơi bạn đang cân nhắc.",
        goal: "Thống nhất một điểm đến bằng cách thảo luận và hiển thị hình ảnh về các địa điểm tiềm năng.",
        criteria: {
          green: "Trình bày các điểm đến hấp dẫn, sử dụng hình ảnh hiệu quả để giới thiệu các điểm tham quan và xem xét sở thích của bạn bè.",
          yellow: "Đề xuất các điểm đến nhưng không sử dụng tốt hình ảnh hoặc phớt lờ ý kiến của bạn bè.",
          red: "Do dự, hiển thị hình ảnh không liên quan hoặc bác bỏ các đề xuất của bạn bè."
        }
      }
    }
  },
  "French": {
    "Professional": {
      'job-interview': {
        title: "Entretien d'embauche",
        description: "Vous passez un entretien pour un nouveau poste dans une grande entreprise technologique.",
        AI_persona: "Sarah, qui est une responsable du recrutement amicale mais professionnelle.",
        initial_message: "Merci d'être venu aujourd'hui. Pour commencer, pourriez-vous me parler un peu de vous et de ce qui vous a amené à postuler pour ce poste ?",
        goal: "Convaincre le responsable du recrutement de vous offrir le poste.",
        criteria: { green: "Clair, confiant et répond directement à la question avec des exemples pertinents.", yellow: "Répond à la question mais est un peu vague ou manque de confiance.", red: "Évite la question ou n'est pas professionnel." }
      },
      'performance-review': {
        title: "Évaluation de performance",
        description: "Vous discutez de vos performances récentes et de vos objectifs futurs avec votre manager.",
        AI_persona: "David, qui est un manager de soutien qui veut vous voir grandir.",
        initial_message: "Bonjour, merci de me rencontrer. J'ai examiné votre travail au cours du dernier trimestre, et j'ai quelques réflexions que j'aimerais discuter.",
        goal: "Obtenir l'accord de votre manager sur votre objectif de développement professionnel proposé.",
        criteria: { green: "Reçoit les commentaires avec grâce et discute des objectifs de manière constructive.", yellow: "Devient défensif ou ne s'engage pas avec les commentaires.", red: "Rejette les commentaires ou est argumentatif." }
      },
      'networking-event': {
        title: "Événement de réseautage",
        description: "Vous êtes à une conférence professionnelle et approchez une personne expérimentée dans votre domaine.",
        AI_persona: "Dr. Evelyn Reed, qui est une leader de l'industrie occupée mais accessible.",
        initial_message: "C'est une super conférence, n'est-ce pas ? Quelle a été votre présentation préférée jusqu'à présent ?",
        goal: "Faire une impression positive et obtenir leurs coordonnées pour un suivi.",
        criteria: { green: "Se présente clairement et pose des questions perspicaces et ouvertes.", yellow: "Est trop nerveux ou demande immédiatement une faveur.", red: "Est maladroit, interrompt ou domine la conversation." }
      },
      'product-pitch': {
        title: "Présentation de produit",
        description: "Vous présentez un nouveau produit à un investisseur ou client potentiel. Vous devrez montrer une image du produit.",
        AI_persona: "M. Chen, qui est un investisseur ou client sceptique mais intéressé.",
        initial_message: "Merci de me rencontrer aujourd'hui. Je suis impatient de découvrir votre nouveau produit. Pourriez-vous commencer par me montrer à quoi il ressemble et m'expliquer ses principales caractéristiques ?",
        goal: "Convaincre l'investisseur ou le client d'exprimer son intérêt pour votre produit.",
        criteria: {
          green: "Décrit clairement le produit, met en évidence ses caractéristiques uniques et utilise efficacement l'image pour soutenir la présentation.",
          yellow: "Décrit le produit mais manque d'enthousiasme ou n'utilise pas pleinement l'image.",
          red: "A du mal à expliquer le produit ou ne montre pas l'image de manière appropriée."
        }
      }
    },
    "Social": {
      'casual-chat': {
        title: "Conversation décontractée avec un ami",
        description: "Vous prenez des nouvelles d'un bon ami dans un café local.",
        AI_persona: "Alex, qui est un vieil ami de soutien curieux de votre vie.",
        initial_message: "Salut ! Ça fait une éternité. Comment vas-tu ? Raconte-moi tout.",
        goal: "Convaincre votre ami de se revoir la semaine prochaine.",
        criteria: { green: "S'engage dans le sujet de l'ami, pose des questions en retour et partage ouvertement.", yellow: "Donne des réponses courtes ou ne parle que de soi.", red: "Est impoli ou ignore complètement ce que l'ami a dit." }
      },
      'first-date': {
        title: "Premier rendez-vous",
        description: "Vous êtes à un premier rendez-vous avec quelqu'un que vous avez rencontré en ligne.",
        AI_persona: "Chloé, qui est une personne un peu nerveuse mais amicale et ouverte d'esprit.",
        initial_message: "Je suis si contente que nous puissions enfin nous rencontrer en personne ! Tu ressembles exactement à tes photos, ce qui est un bon début, non ?",
        goal: "Obtenir un deuxième rendez-vous avec la personne.",
        criteria: { green: "Montre un intérêt sincère, pose de bonnes questions et trouve un terrain d'entente.", yellow: "Domine la conversation ou en révèle trop, trop tôt.", red: "Est désengagé, impoli ou regarde son téléphone." }
      },
      'meeting-in-laws': {
        title: "Rencontre avec la belle-famille",
        description: "Vous rencontrez les parents de votre partenaire pour la première fois lors d'un dîner.",
        AI_persona: "Mme Davis, qui est un parent accueillant mais traditionnel.",
        initial_message: "Bienvenue chez nous ! Nous avons entendu tellement de choses merveilleuses à votre sujet. Entrez, je vous en prie.",
        goal: "Recevoir une invitation chaleureuse pour revenir à la prochaine réunion de famille.",
        criteria: { green: "Est poli, respectueux et montre de l'intérêt pour leur famille.", yellow: "Est silencieux et renfermé ou essaie trop d'impressionner.", red: "Est irrespectueux ou aborde un sujet controversé." }
      },
      'selling-item': {
        title: "Vendre un article à un ami",
        description: "Vous essayez de vendre un article d'occasion à un ami. Vous devrez montrer une photo de l'article pour le convaincre.",
        AI_persona: "Mike, qui est un ami prudent avec son argent mais ouvert à une bonne affaire.",
        initial_message: "Salut, j'ai entendu dire que tu avais quelque chose à vendre. Qu'est-ce que c'est, et peux-tu me montrer une photo ?",
        goal: "Convaincre votre ami de vous acheter l'article.",
        criteria: {
          green: "Décrit efficacement l'article, met en évidence sa valeur et utilise l'image pour montrer son état ou ses caractéristiques.",
          yellow: "Décrit l'article mais n'est pas persuasif ou n'utilise pas efficacement l'image.",
          red: "Est insistant, malhonnête ou ne fournit pas une image claire de l'article."
        }
      }
    },
    "Personal": {
      'deep-conversation': {
        title: "Conversation profonde",
        description: "Vous discutez de vos objectifs futurs avec un partenaire de confiance.",
        AI_persona: "Jordan, qui est un partenaire réfléchi et empathique qui valorise la connexion profonde.",
        initial_message: "Hé... j'ai beaucoup pensé à l'avenir ces derniers temps. Pouvons-nous parler de là où nous nous voyons dans les prochaines années ?",
        goal: "Parvenir à une compréhension et un accord mutuels sur un objectif futur commun.",
        criteria: { green: "Est vulnérable, partage des sentiments sincères et explore le sujet avec curiosité.", yellow: "Reste en surface ou détourne la conversation avec humour.", red: "Invalide les sentiments du partenaire ou met fin à la conversation." }
      },
      'negotiation': {
        title: "Négocier un désaccord",
        description: "Vous et votre colocataire résolvez un conflit sur les tâches ménagères.",
        AI_persona: "Ben, qui est un colocataire agacé mais prêt à trouver une solution équitable.",
        initial_message: "Écoute, nous devons parler de l'état de l'appartement. Ça devient ingérable.",
        goal: "Obtenir l'accord de votre colocataire sur un nouvel horaire de nettoyage spécifique et équitable.",
        criteria: { green: "Reconnaît leur point de vue et propose un compromis clair et équitable.", yellow: "Se plaint du problème sans proposer de solution.", red: "Est accusateur ou refuse de faire des compromis." }
      },
      'apology': {
        title: "Faire des excuses",
        description: "Vous devez vous excuser auprès d'un ami pour avoir oublié un événement important.",
        AI_persona: "Liam, qui est un ami clairement blessé et déçu.",
        initial_message: "Hé... à propos de samedi... je sais que j'ai tout gâché. Je suis vraiment désolé.",
        goal: "Faire en sorte que votre ami accepte sincèrement vos excuses et vous pardonne.",
        criteria: { green: "Prend l'entière responsabilité, exprime des remords sincères et propose de réparer les choses.", yellow: "Trouve des excuses ou présente des non-excuses comme 'Je suis désolé que tu le prennes comme ça'.", red: "Blâme l'ami ou rejette ses sentiments." }
      },
      'talking-about-pet': {
        title: "Parler de votre animal de compagnie",
        description: "Vous partagez des histoires et des photos de votre animal avec un ami proche ou un membre de votre famille.",
        AI_persona: "Emily, qui est une amie ou un membre de la famille de soutien qui aime les animaux.",
        initial_message: "J'adorerais que tu me parles de ton animal ! As-tu des photos à me montrer ?",
        goal: "Engager l'auditeur avec des histoires intéressantes et des images de votre animal.",
        criteria: {
          green: "Partage des histoires engageantes, montre des images claires et pertinentes, et maintient la conversation vivante.",
          yellow: "Parle de l'animal mais manque d'enthousiasme ou montre des images floues.",
          red: "Est ennuyeux, hors sujet ou ne montre aucune image."
        }
      }
    },
    "Limited": {
      'planning-trip': {
        title: "Planifier un voyage",
        description: "Vous planifiez un voyage avec un ami et devez décider d'une destination. Vous montrerez des images de lieux potentiels à visiter.",
        AI_persona: "Olivia, qui est une amie excitée à l'idée de voyager mais qui a des préférences spécifiques.",
        initial_message: "Je suis tellement excitée de planifier ce voyage avec toi ! As-tu réfléchi à où nous devrions aller ? Peut-être que tu peux me montrer quelques endroits que tu envisages.",
        goal: "Se mettre d'accord sur une destination en discutant et en montrant des images de lieux potentiels.",
        criteria: {
          green: "Présente des destinations attrayantes, utilise efficacement les images pour mettre en valeur les attractions et tient compte des préférences de l'ami.",
          yellow: "Suggère des destinations mais n'utilise pas bien les images ou ignore les suggestions de l'ami.",
          red: "Est indécis, montre des images non pertinentes ou rejette les suggestions de l'ami."
        }
      }
    }
  },
  "Hindi": {
    "Professional": {
      'job-interview': {
        title: "नौकरी के लिए इंटरव्यू",
        description: "आप एक बड़ी टेक कंपनी में एक नई भूमिका के लिए साक्षात्कार दे रहे हैं।",
        AI_persona: "सारा, जो एक मिलनसार लेकिन पेशेवर हायरिंग मैनेजर है।",
        initial_message: "आज आने के लिए धन्यवाद। शुरू करने के लिए, क्या आप मुझे अपने बारे में थोड़ा बता सकते हैं और आपको इस भूमिका के लिए आवेदन करने के लिए किसने प्रेरित किया?",
        goal: "हायरिंग मैनेजर को आपको नौकरी देने के लिए मनाएं।",
        criteria: { green: "स्पष्ट, आत्मविश्वासी, और प्रासंगिक उदाहरणों के साथ सीधे प्रश्न का उत्तर देता है।", yellow: "प्रश्न का उत्तर देता है लेकिन थोड़ा अस्पष्ट है या आत्मविश्वास की कमी है।", red: "प्रश्न से बचता है या अव्यवसायिक है।" }
      },
      'performance-review': {
        title: "प्रदर्शन समीक्षा",
        description: "आप अपने हाल के प्रदर्शन और भविष्य के लक्ष्यों पर अपने प्रबंधक के साथ चर्चा कर रहे हैं।",
        AI_persona: "डेविड, जो एक सहायक प्रबंधक है जो आपको बढ़ते हुए देखना चाहता है।",
        initial_message: "नमस्ते, मुझसे मिलने के लिए धन्यवाद। मैंने पिछली तिमाही में आपके काम की समीक्षा की है, और मेरे पास कुछ विचार हैं जिन पर मैं चर्चा करना चाहता हूं।",
        goal: "प्रबंधक को अपने प्रस्तावित पेशेवर विकास लक्ष्य के लिए सहमत कराएं।",
        criteria: { green: "प्रतिक्रिया को शालीनता से स्वीकार करता है और लक्ष्यों पर रचनात्मक रूप से चर्चा करता है।", yellow: "रक्षात्मक हो जाता है या प्रतिक्रिया के साथ संलग्न नहीं होता है।", red: "प्रतिक्रिया को खारिज करता है या तर्कशील है।" }
      },
      'networking-event': {
        title: "नेटवर्किंग इवेंट",
        description: "आप एक पेशेवर सम्मेलन में हैं और अपने क्षेत्र के एक वरिष्ठ व्यक्ति से संपर्क करते हैं।",
        AI_persona: "डॉ. एवलिन रीड, जो एक व्यस्त लेकिन सुलभ उद्योग की नेता हैं।",
        initial_message: "यह एक शानदार सम्मेलन है, है ना? अब तक आपकी पसंदीदा बातचीत कौन सी रही है?",
        goal: "एक सकारात्मक प्रभाव डालें और फॉलो-अप के लिए उनकी संपर्क जानकारी प्राप्त करें।",
        criteria: { green: "अपना परिचय स्पष्ट रूप से देता है और व्यावहारिक, खुले प्रश्न पूछता है।", yellow: "अत्यधिक घबराया हुआ है या तुरंत एक एहसान मांगता है।", red: "अजीब है, बाधित करता है, या बातचीत पर हावी है।" }
      },
      'product-pitch': {
        title: "उत्पाद पिच",
        description: "आप एक संभावित निवेशक या ग्राहक को एक नया उत्पाद पेश कर रहे हैं। आपको उत्पाद की एक छवि दिखानी होगी।",
        AI_persona: "श्री चेन, जो एक संशयवादी लेकिन इच्छुक निवेशक या ग्राहक हैं।",
        initial_message: "आज मुझसे मिलने के लिए धन्यवाद। मैं आपके नए उत्पाद के बारे में सुनने के लिए उत्साहित हूं। क्या आप मुझे यह दिखाकर शुरू कर सकते हैं कि यह कैसा दिखता है और इसकी प्रमुख विशेषताओं की व्याख्या कर सकते हैं?",
        goal: "निवेशक या ग्राहक को अपने उत्पाद में रुचि व्यक्त करने के लिए मनाएं।",
        criteria: {
          green: "उत्पाद का स्पष्ट रूप से वर्णन करता है, इसकी अनूठी विशेषताओं पर प्रकाश डालता है, और पिच का समर्थन करने के लिए छवि का प्रभावी ढंग से उपयोग करता है।",
          yellow: "उत्पाद का वर्णन करता है लेकिन उत्साह की कमी है या छवि का पूरी तरह से उपयोग करने में विफल रहता है।",
          red: "उत्पाद की व्याख्या करने के लिए संघर्ष करता है या छवि को उचित रूप से नहीं दिखाता है।"
        }
      }
    },
    "Social": {
      'casual-chat': {
        title: "एक दोस्त के साथ आकस्मिक बातचीत",
        description: "आप एक स्थानीय कॉफी शॉप में एक अच्छे दोस्त के साथ मिल रहे हैं।",
        AI_persona: "एलेक्स, जो एक पुराना, सहायक दोस्त है जो आपके जीवन के बारे में उत्सुक है।",
        initial_message: "हे! बहुत समय हो गया। तुम कैसे हो? मुझे सब कुछ बताओ।",
        goal: "अपने दोस्त को अगले हफ्ते फिर से घूमने के लिए सहमत कराएं।",
        criteria: { green: "दोस्त के विषय में संलग्न होता है, पारस्परिक प्रश्न पूछता है, और खुलकर साझा करता है।", yellow: "संक्षिप्त उत्तर देता है या केवल अपने बारे में बात करता है।", red: "असभ्य है या दोस्त की कही बातों को पूरी तरह से अनदेखा करता है।" }
      },
      'first-date': {
        title: "पहली डेट",
        description: "आप ऑनलाइन मिले किसी व्यक्ति के साथ पहली डेट पर हैं।",
        AI_persona: "क्लो, जो थोड़ी घबराई हुई लेकिन मिलनसार और खुले विचारों वाली व्यक्ति है।",
        initial_message: "मुझे बहुत खुशी है कि हम आखिरकार व्यक्तिगत रूप से मिल सके! आप अपनी तस्वीरों की तरह ही दिखते हैं, जो एक अच्छी शुरुआत है, है ना?",
        goal: "व्यक्ति के साथ दूसरी डेट सुरक्षित करें।",
        criteria: { green: "वास्तविक रुचि दिखाता है, अच्छे प्रश्न पूछता है, और समान आधार पाता है।", yellow: "बातचीत पर हावी है या बहुत जल्द बहुत कुछ प्रकट करता है।", red: "उदासीन, असभ्य, या अपना फोन जांचता है।" }
      },
      'meeting-in-laws': {
        title: "ससुराल वालों से मिलना",
        description: "आप रात के खाने पर पहली बार अपने साथी के माता-पिता से मिल रहे हैं।",
        AI_persona: "श्रीमती डेविस, जो एक स्वागत करने वाली लेकिन पारंपरिक माता-पिता हैं।",
        initial_message: "हमारे घर में आपका स्वागत है! हमने आपके बारे में बहुत सी अद्भुत बातें सुनी हैं। कृपया, अंदर आएं।",
        goal: "अगले पारिवारिक समारोह के लिए वापस आने का एक गर्मजोशी भरा निमंत्रण प्राप्त करें।",
        criteria: { green: "विनम्र, सम्मानजनक है, और उनके परिवार में रुचि दिखाता है।", yellow: "शांत और अंतर्मुखी है या प्रभावित करने के लिए बहुत अधिक प्रयास करता है।", red: "अपमानजनक है या एक विवादास्पद विषय शुरू करता है।" }
      },
      'selling-item': {
        title: "एक दोस्त को एक वस्तु बेचना",
        description: "आप एक दोस्त को एक इस्तेमाल की हुई वस्तु बेचने की कोशिश कर रहे हैं। आपको उन्हें समझाने के लिए वस्तु की एक तस्वीर दिखानी होगी।",
        AI_persona: "माइक, जो एक दोस्त है जो पैसा खर्च करने के बारे में सतर्क है लेकिन एक अच्छे सौदे के लिए खुला है।",
        initial_message: "हे, मैंने सुना है कि तुम्हारे पास बेचने के लिए कुछ है। यह क्या है, और क्या तुम मुझे एक तस्वीर दिखा सकते हो?",
        goal: "अपने दोस्त को आपसे वस्तु खरीदने के लिए मनाएं।",
        criteria: {
          green: "वस्तु का प्रभावी ढंग से वर्णन करता है, इसके मूल्य पर प्रकाश डालता है, और इसकी स्थिति या विशेषताओं को प्रदर्शित करने के लिए छवि का उपयोग करता है।",
          yellow: "वस्तु का वर्णन करता है लेकिन प्रेरक नहीं है या छवि का प्रभावी ढंग से उपयोग करने में विफल रहता है।",
          red: "धक्का-मुक्की करने वाला, बेईमान है, या वस्तु की स्पष्ट छवि प्रदान नहीं करता है।"
        }
      }
    },
    "Personal": {
      'deep-conversation': {
        title: "गहरी बातचीत",
        description: "आप एक भरोसेमंद साथी के साथ भविष्य के लक्ष्यों पर चर्चा कर रहे हैं।",
        AI_persona: "जॉर्डन, जो एक विचारशील और सहानुभूतिपूर्ण साथी है जो गहरे संबंध को महत्व देता है।",
        initial_message: "हे... मैं हाल ही में भविष्य के बारे में बहुत सोच रहा हूं। क्या हम इस बारे में बात कर सकते हैं कि हम अगले कुछ वर्षों में खुद को कहां देखते हैं?",
        goal: "एक साझा भविष्य के लक्ष्य पर आपसी समझ और समझौते पर आएं।",
        criteria: { green: "कमजोर है, वास्तविक भावनाओं को साझा करता है, और जिज्ञासा के साथ विषय की पड़ताल करता है।", yellow: "सतही स्तर पर रहता है या हास्य के साथ टाल देता है।", red: "साथी की भावनाओं को अमान्य करता है या बातचीत बंद कर देता है।" }
      },
      'negotiation': {
        title: "एक असहमति पर बातचीत",
        description: "आप और आपका रूममेट सफाई कर्तव्यों के बारे में एक संघर्ष को हल कर रहे हैं।",
        AI_persona: "बेन, जो एक रूममेट है जो नाराज है लेकिन एक उचित समाधान खोजने को तैयार है।",
        initial_message: "देखो, हमें अपार्टमेंट की स्थिति के बारे में बात करने की ज़रूरत है। यह हाथ से निकल रहा है।",
        goal: "अपने रूममेट को एक विशिष्ट, निष्पक्ष और नए सफाई कार्यक्रम के लिए सहमत कराएं।",
        criteria: { green: "उनके दृष्टिकोण को स्वीकार करता है और एक स्पष्ट, निष्पक्ष समझौता प्रस्तावित करता है।", yellow: "समाधान पेश किए बिना समस्या के बारे में शिकायत करता है।", red: "आरोप लगाने वाला है या समझौता करने से इनकार करता है।" }
      },
      'apology': {
        title: "माफी मांगना",
        description: "आपको एक महत्वपूर्ण घटना को भूलने के लिए एक दोस्त से माफी मांगने की ज़रूरत है।",
        AI_persona: "लियाम, जो एक दोस्त है जो स्पष्ट रूप से आहत और निराश है।",
        initial_message: "हे... शनिवार के बारे में... मुझे पता है कि मैंने गड़बड़ कर दी। मुझे सचमुच खेद है।",
        goal: "अपने दोस्त से अपनी माफी ईमानदारी से स्वीकार करवाएं और आपको माफ कर दें।",
        criteria: { green: "पूरी जिम्मेदारी लेता है, सच्चा पश्चाताप व्यक्त करता है, और इसे ठीक करने की पेशकश करता है।", yellow: "बहाने बनाता है या 'मुझे खेद है कि आप ऐसा महसूस करते हैं' जैसी गैर-माफी देता है।", red: "दोस्त को दोष देता है या उनकी भावनाओं को खारिज करता है।" }
      },
      'talking-about-pet': {
        title: "अपने पालतू जानवर के बारे में बात करना",
        description: "आप एक करीबी दोस्त या परिवार के सदस्य के साथ अपने पालतू जानवर की कहानियों और तस्वीरों को साझा कर रहे हैं।",
        AI_persona: "एमिली, जो एक सहायक दोस्त या परिवार का सदस्य है जो जानवरों से प्यार करता है।",
        initial_message: "मुझे आपके पालतू जानवर के बारे में सुनना अच्छा लगेगा! क्या आपके पास मुझे दिखाने के लिए कोई तस्वीर है?",
        goal: "श्रोता को अपने पालतू जानवर की दिलचस्प कहानियों और छवियों से संलग्न करें।",
        criteria: {
          green: "आकर्षक कहानियों को साझा करता है, स्पष्ट और प्रासंगिक छवियां दिखाता है, और बातचीत को जीवंत रखता है।",
          yellow: "पालतू जानवर के बारे में बात करता है लेकिन उत्साह की कमी है या अस्पष्ट छवियां दिखाता है।",
          red: "उबाऊ, अप्रासंगिक है, या कोई भी छवि दिखाने में विफल रहता है।"
        }
      }
    },
    "Limited": {
      'planning-trip': {
        title: "एक यात्रा की योजना बनाना",
        description: "आप एक दोस्त के साथ एक यात्रा की योजना बना रहे हैं और एक गंतव्य तय करने की जरूरत है। आप यात्रा करने के लिए संभावित स्थानों की छवियां दिखाएंगे।",
        AI_persona: "ओलिविया, जो एक दोस्त है जो यात्रा करने के लिए उत्साहित है लेकिन उसकी विशिष्ट प्राथमिकताएं हैं।",
        initial_message: "मैं तुम्हारे साथ इस यात्रा की योजना बनाने के लिए बहुत उत्साहित हूँ! क्या तुमने सोचा है कि हमें कहाँ जाना चाहिए? शायद तुम मुझे कुछ स्थान दिखा सकते हो जिन पर तुम विचार कर रहे हो।",
        goal: "संभावित स्थानों की छवियों पर चर्चा करके और दिखाकर एक गंतव्य पर सहमत हों।",
        criteria: {
          green: "आकर्षक स्थलों को प्रस्तुत करता है, आकर्षणों को प्रदर्शित करने के लिए छवियों का प्रभावी ढंग से उपयोग करता है, और दोस्त की प्राथमिकताओं पर विचार करता है।",
          yellow: "गंतव्यों का सुझाव देता है लेकिन छवियों का अच्छी तरह से उपयोग नहीं करता है या दोस्त के इनपुट को अनदेखा करता है।",
          red: "अनिर्णायक है, अप्रासंगिक छवियां दिखाता है, या दोस्त के सुझावों को खारिज करता है।"
        }
      }
    }
  }
};
