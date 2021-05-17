import axios from 'axios';
import { config } from '../../../config';

export const CHAIN_ID = config.blockchain.chainId;

export const Networks = {
  MainNet: 1,
  Ropsten: 3,
};

export const usdcAddress: {
  [key: number]: string;
} = {
  [Networks.MainNet]: '',
  [Networks.Ropsten]: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
};

const apiUrl: {
  [key: number]: string;
} = {
  [Networks.MainNet]: 'https://api.etherscan.io/api',
  [Networks.Ropsten]: 'https://api-ropsten.etherscan.io/api',
};

class EtherscanService {
  private apiKey = config.blockchain.apiKey;

  public async getCurrentBlock(): Promise<{ result: string }> {
    const res = await axios.get<{ result: string }>(
      apiUrl[CHAIN_ID] +
        '?module=block' +
        '&action=getblocknobytime' +
        '&timestamp=' +
        Math.floor(Date.now() / 1000) +
        '&closest=before' +
        '&apikey=' +
        this.apiKey
    );
    return res.data;
  }

  public async getTxList<T extends EtherscanActions>({
    action,
    address,
    startBlock = '0',
    endBlock = '99999999',
    sort = 'asc',
  }: {
    action: T;
    address: string;
    startBlock?: string;
    endBlock?: string;
    sort?: string;
  }): Promise<EtherscanResponse<EtherscanReturnType<T>[]>> {
    const res = await axios.get<EtherscanResponse<EtherscanReturnType<T>[]>>(
      apiUrl[CHAIN_ID] +
        '?module=account' +
        '&action=' +
        action +
        '&address=' +
        address +
        '&startblock=' +
        startBlock +
        '&endblock=' +
        endBlock +
        '&sort=' +
        sort +
        '&apikey=' +
        this.apiKey
    );
    return res.data;
  }
}

export default new EtherscanService();

type EtherscanActions = 'txlist' | 'tokentx' | 'tokennfttx';

type EtherscanReturnType<T> = T extends 'txlist'
  ? TxListResponse
  : T extends 'tokentx'
  ? TokenTxReponse
  : T extends 'tokennfttx'
  ? TokenTxReponse
  : never;

interface EtherscanResponse<ResultType> {
  status: string;
  message;
  string;
  result: ResultType;
}

interface TxListResponse {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
}

interface TokenTxReponse {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  nonce: string;
  timeStamp: string;
  to: string;
  tokenDecimal: string;
  tokenName: string;
  tokenSymbol: string;
  transactionIndex: string;
  value: string;
}
