import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CalendarRange, EllipsisVertical, Clock, CircleAlert as AlertaCirculo } from 'lucide-react-native';

interface CartaoTarefaProps {
  titulo: string;
  prazo: string;
  etiquetasPrioridade: 'baixa' | 'media' | 'alta';
  etiquetasStatus: 'pendente' | 'em-progresso' | 'concluido';
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'pendente' | 'em-progresso' | 'concluido';
  aoPressionar?: () => void;
}

const etiquetasStatus = {
  pendente: 'Pendente',
  'em-progresso': 'Em Progresso',
  concluido: 'Concluído',
};

const etiquetasPrioridade = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};

const coresPrioridade = {
  baixa: '#4CAF50', // Verde
  media: '#FFC107', // Âmbar
  alta: '#F44336', // Vermelho
};

export default function CartaoTarefa({ titulo, prazo, prioridade, status, aoPressionar }: CartaoTarefaProps) {
  return (
    <TouchableOpacity onPress={aoPressionar}>
      <View style={estilos.container}>
        <View style={estilos.bordaEsquerda} />
        <View style={estilos.conteudo}>
          <View style={estilos.cabecalho}>
            <View style={estilos.secaoTitulo}>
              <Text style={estilos.titulo}>{titulo}</Text>
              <View style={estilos.etiquetas}>
                <View style={[estilos.etiquetaPrioridade, { backgroundColor: coresPrioridade[prioridade] }]}>
                  <AlertaCirculo size={12} color="#FFF" />
                  <Text style={estilos.textoPrioridade}>{etiquetasPrioridade[prioridade]}</Text>
                </View>
                <View style={estilos.etiquetaStatus}>
                  <Text style={estilos.textoStatus}>{etiquetasStatus[status]}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={estilos.botaoMais}>
              <EllipsisVertical size={24} color="#324646" />
            </TouchableOpacity>
          </View>

          <View style={estilos.rodape}>
            <View style={estilos.containerPrazo}>
              <Clock size={16} color="#666" />
              <Text style={estilos.prazo}>{prazo}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bordaEsquerda: {
    width: 4,
    backgroundColor: '#324646',
  },
  conteudo: {
    flex: 1,
    padding: 16,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  secaoTitulo: {
    flex: 1,
    gap: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#324646',
  },
  etiquetas: {
    flexDirection: 'row',
    gap: 8,
  },
  etiquetaPrioridade: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  textoPrioridade: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  etiquetaStatus: {
    backgroundColor: '#E8F1F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoStatus: {
    color: '#324646',
    fontSize: 12,
    fontWeight: '500',
  },
  botaoMais: {
    padding: 4,
  },
  rodape: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerPrazo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  prazo: {
    color: '#666',
    fontSize: 14,
  },
});