/**
 * This file contains the interfaces used in the application.
 * It includes the FactResponse interface, which defines the structure of the
 * response from the API, and the Fact interface, which defines the structure
 * of an Fact object.
 */

export interface Fact {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
}

export interface FactResponse {
  data?: Fact;
  error?: unknown;
}
