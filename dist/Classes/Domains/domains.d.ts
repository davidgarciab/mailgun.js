import { IDomainTemplatesClient, IDomainTagsClient, IDomainCredentials, IDomainClient } from '../../Interfaces/Domains';
import { APIResponse } from '../../Types/Common/ApiResponse';
import Request from '../common/Request';
import DomainCredentialsClient from './domainsCredentials';
import DomainTemplatesClient from './domainsTemplates';
import DomainTagsClient from './domainsTags';
import { DNSRecord, DomainShortData, MessageResponse, DomainTrackingData, UpdatedOpenTracking, DomainsQuery, DomainInfo, ConnectionSettings, UpdatedConnectionSettings, OpenTrackingInfo, ClickTrackingInfo, UnsubscribeTrackingInfo, ReplacementForPool, DKIMAuthorityInfo, UpdatedDKIMAuthority, DKIMSelectorInfo, UpdatedDKIMSelectorResponse, WebPrefixInfo, UpdatedWebPrefixResponse } from '../../Types/Domains';
export declare class Domain {
    name: string;
    require_tls: boolean;
    skip_verification: boolean;
    state: string;
    wildcard: boolean;
    spam_action: string;
    created_at: string;
    smtp_password: string;
    smtp_login: string;
    type: string;
    receiving_dns_records: DNSRecord[] | null;
    sending_dns_records: DNSRecord[] | null;
    constructor(data: DomainShortData, receiving?: DNSRecord[] | null, sending?: DNSRecord[] | null);
}
export default class DomainClient implements IDomainClient {
    request: Request;
    domainCredentials: IDomainCredentials;
    domainTemplates: IDomainTemplatesClient;
    domainTags: IDomainTagsClient;
    constructor(request: Request, domainCredentialsClient: DomainCredentialsClient, domainTemplatesClient: DomainTemplatesClient, domainTagsClient: DomainTagsClient);
    private _parseMessage;
    private parseDomainList;
    private _parseDomain;
    private _parseTrackingSettings;
    private _parseTrackingUpdate;
    list(query?: DomainsQuery): Promise<Domain[]>;
    get(domain: string): Promise<Domain>;
    create(data: DomainInfo): Promise<Domain>;
    verify(domain: string): Promise<Domain>;
    destroy(domain: string): Promise<MessageResponse>;
    getConnection(domain: string): Promise<ConnectionSettings>;
    updateConnection(domain: string, data: ConnectionSettings): Promise<UpdatedConnectionSettings>;
    getTracking(domain: string): Promise<DomainTrackingData>;
    updateTracking(domain: string, type: string, data: OpenTrackingInfo | ClickTrackingInfo | UnsubscribeTrackingInfo): Promise<UpdatedOpenTracking>;
    getIps(domain: string): Promise<string[]>;
    assignIp(domain: string, ip: string): Promise<APIResponse>;
    deleteIp(domain: string, ip: string): Promise<APIResponse>;
    linkIpPool(domain: string, pool_id: string): Promise<APIResponse>;
    unlinkIpPoll(domain: string, replacement: ReplacementForPool): Promise<APIResponse>;
    updateDKIMAuthority(domain: string, data: DKIMAuthorityInfo): Promise<UpdatedDKIMAuthority>;
    updateDKIMSelector(domain: string, data: DKIMSelectorInfo): Promise<UpdatedDKIMSelectorResponse>;
    updateWebPrefix(domain: string, data: WebPrefixInfo): Promise<UpdatedWebPrefixResponse>;
}