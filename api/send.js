import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    const emailContent = `
      <h1>Nova Avaliação - WS Consultoria</h1>
      <h2>1. Identificação</h2>
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Idade:</strong> ${data.idade} (${data.nascimento})</p>
      <p><strong>WhatsApp:</strong> ${data.whats}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Sexo:</strong> ${data.sexo}</p>
      <p><strong>Estado Civil:</strong> ${data.estadoCivil}</p>

      <h2>2. Dados Corporais e Objetivos</h2>
      <p><strong>Peso:</strong> ${data.peso} kg | <strong>Altura:</strong> ${data.altura} cm | <strong>IMC:</strong> ${data.imc}</p>
      <p><strong>Gordura:</strong> ${data.gordura}% | <strong>Cintura:</strong> ${data.cintura} cm</p>
      <p><strong>Objetivo:</strong> ${data.objetivo} | <strong>Meta de Peso:</strong> ${data.pesoMeta} kg | <strong>Prazo:</strong> ${data.prazo}</p>
      <p><strong>TMB Calculada:</strong> ${data.tmb} kcal | <strong>Meta Calórica Diária:</strong> ${data.metaCal} kcal</p>
      <p><strong>Sugestão Proteína:</strong> ${data.proteina}g | <strong>Água:</strong> ${data.agua}L</p>

      <h2>3. Estilo de Vida</h2>
      <p><strong>Nível de Atividade:</strong> ${data.nivelAtividade}</p>
      <p><strong>Trabalho:</strong> ${data.trabalho}</p>
      <p><strong>Sono:</strong> ${data.sono}h | <strong>Estresse:</strong> ${data.estresse}/10</p>
      <p><strong>Álcool:</strong> ${data.alcool} | <strong>Fuma:</strong> ${data.fuma}</p>

      <h2>4. Alimentação e Treino</h2>
      <p><strong>Refeições diárias:</strong> ${data.refeicoes}</p>
      <p><strong>Come doces:</strong> ${data.doces}</p>
      <p><strong>Pede delivery:</strong> ${data.delivery}</p>
      <p><strong>Treina atualmente:</strong> ${data.treina}</p>
      <p><strong>Frequência:</strong> ${data.freqTreino}</p>
      <p><strong>Faz Cardio:</strong> ${data.cardio}</p>

      <h2>5. Histórico e Saúde mental</h2>
      <p><strong>Doenças:</strong> ${data.doencas}</p>
      <p><strong>Medicamentos:</strong> ${data.medicamentos}</p>
      <p><strong>Lesões:</strong> ${data.lesoes}</p>
      <p><strong>Cirurgias:</strong> ${data.cirurgia}</p>
      <p><strong>Motivo de parada anterior:</strong> ${data.parada}</p>
      <p><strong>Sabota alimentação com estresse:</strong> Nível ${data.sabAlim}</p>
      <p><strong>Reação ao falhar:</strong> Nível ${data.reacaoFalha}</p>
      <p><strong>Maior Motivação:</strong> ${data.motivacao}</p>
    `;

    const { data: resendData, error } = await resend.emails.send({
      from: 'WS Consultoria <onboarding@resend.dev>', // Change to verified domain email in production
      to: process.env.RECEIVER_EMAIL || 'lucas@example.com', // Replace with the actual email
      subject: `Nova Avaliação: ${data.nome}`,
      html: emailContent,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(200).json({ success: true, data: resendData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
